var _ = require("lodash");
module.exports = {
    friendlyName: "Subscribe user",
    description: "",
    inputs: {},
    exits: {
        normalError: sails.config.globals.statusCodes.normalError,
    },

    fn: async function (inputs, exits) {
        var req = this.req;
        if (!req.isSocket) {
            return exits.normalError({
                status: false,
                message: sails.__("Only Socket request allowed"),
            });
        }

        User.subscribe(req, [req.loggedInUser.id]);

        var userData = await User.update({ id: req.loggedInUser.id }).set({
            socketId: req.socket.id,
            isUserOnline: true,
        });
        sails.sockets.blast(
            "message",
            {
                action: "userIsOnline",
                data: {
                    userId: userData[0]["id"],
                    name: userData[0]["name"],
                },
                message: sails.__("User is Online"),
            },
            req
        );

        await sendReceiveMessageSocketToLoggedInUser(req);

        return exits.success({
            status: true,
            message: "subscribe the user successfully",
        });
    },
};

async function sendReceiveMessageSocketToLoggedInUser(req) {
    var getReceiverMessageQuery = `SELECT subquery.*
        FROM groupMessageStatus AS gms
        INNER JOIN (
            SELECT groupId, COUNT(a.id) AS unreadCount, MAX(messageId) AS latestMessageId
            FROM groupMessageStatus AS a 
            WHERE status='sent' AND receiverId=1
            GROUP BY groupId
        ) AS subquery
        ON gms.groupId = subquery.groupId AND gms.messageId = subquery.latestMessageId
        WHERE gms.status='sent' AND gms.receiverId=$1`;

    const getReceiverMessageQueryValues = [req.loggedInUser.id];
    var getReceiverMessageData = await sails.sendNativeQuery(
        getReceiverMessageQuery,
        getReceiverMessageQueryValues
    );
    getReceiverMessageData = getReceiverMessageData.rows;

    for (let i = 0; i < getReceiverMessageData.length; i++) {
        var lastMessage = await Chat.findOne({
            id: getReceiverMessageData[i]["latestMessageId"],
        });
        if (lastMessage) {
            var receiverDetail = null;
            var senderDetails = null;

            if (lastMessage?.senderId === req.loggedInUser.id) {
                receiverDetail = await User.findOne({ id: lastMessage.receiverId });
                receiverDetail = await sails.helpers.socket.model.exportToJson(
                    receiverDetail
                );

                senderDetails = await sails.helpers.socket.model.exportToJson(
                    req.loggedInUser
                );
            } else {
                senderDetails = await User.findOne({ id: lastMessage.senderId });
                senderDetails = await sails.helpers.socket.model.exportToJson(
                    senderDetails
                );

                receiverDetail = await sails.helpers.socket.model.exportToJson(
                    req.loggedInUser
                );
            }

            lastMessage.receiverImage = receiverDetail.defaultImageUrl;
            lastMessage.receiverName = receiverDetail.name;
            lastMessage.receiverSecretId = receiverDetail.secretId;

            lastMessage.senderImage = senderDetails.defaultImageUrl;
            lastMessage.senderName = senderDetails.name;
            lastMessage.senderSecretId = senderDetails.secretId;

            lastMessage.isDeleted = receiverDetail.isDeleted;
            lastMessage.isUserOnline = receiverDetail.isUserOnline;
            lastMessage.unreadCount = await GroupMessageStatus.count({
                receiverId: senderDetails.id,
                groupId: getReceiverMessageData[i]["groupId"],
                status: { in: ["sent", "deliver"] },
            });

            var sendData = {
                action: "sendUnreadMessage",
                data: {
                    chatMessage: lastMessage,
                },
                message: sails.__("publish message successfully"),
            };

            User.publish([req.loggedInUser.id], sendData);
            await GroupMessageStatus.update({
                groupId: getReceiverMessageData[i]["groupId"],
                receiverId: req.loggedInUser.id,
                status: { in: ["sent"] },
            }).set({ status: "deliver" });
        }
    }

    return;
}
