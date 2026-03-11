module.exports = {
    friendlyName: "Subscribe group",
    description: "",
    inputs: {
        groupId: {
            type: "number",
            required: true,
        },
    },
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

        var groupDetail = await ChatGroup.findOne({ id: inputs.groupId });
        if (!groupDetail) {
            return exits.normalError({
                status: false,
                message: sails.__("Invalid groupId"),
            });
        }

        var subscribeGroup = await ChatGroupMember.findOne({
            chatGroupId: inputs.groupId,
            memberId: req.loggedInUser.id,
        });
        if (!subscribeGroup) {
            return exits.normalError({
                message: sails.__("User is not member of group"),
            });
        }

        ChatGroupMember.subscribe(req, [subscribeGroup.id]);
        var updatedChatStatusWithRead = await GroupMessageStatus.update({
            groupId: inputs.groupId,
            receiverId: req.loggedInUser.id,
            status: ["sent", "deliver"],
        })
            .set({
                status: "read",
            })
            .fetch();

        if (!updatedChatStatusWithRead.length) {
            return exits.success({
                status: true,
                message: sails.__("Message status already updated"),
            });
        }

        var getUnreadCountQuery = `SELECT gms.groupId AS unreadCount, COUNT(gms.id) AS unreadCount FROM groupMessageStatus AS gms 
        WHERE gms.receiverId=$1 AND status IN('sent','deliver') 
        GROUP BY gms.groupId`;

        const getUnreadCountQueryValues = [req.loggedInUser.id];
        var getUnreadCountData = await sails.sendNativeQuery(
            getUnreadCountQuery,
            getUnreadCountQueryValues
        );
        getUnreadCountData = getUnreadCountData.rows;

        let sendData = {
            action: "unreadBadgeCount",
            data: {
                unreadBadgeCount: getUnreadCountData.length,
            },
            message: sails.__("Get unread badge count successfully"),
        };
        User.publish([req.loggedInUser.id], sendData);

        return exits.success({
            status: true,
            message: sails.__("Update Message status successfully"),
        });
    },
};
