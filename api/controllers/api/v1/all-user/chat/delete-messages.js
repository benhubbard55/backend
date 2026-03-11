module.exports = {
    friendlyName: "Delete message",
    description: "",
    inputs: {
        deleteMessageIds: {
            type: "ref",
            required: true,
        },
        chatGroupId: {
            type: "number",
            required: true,
        },
    },
    exits: {
        normalError: sails.config.globals.statusCodes.normalError,
    },

    fn: async function (inputs, exits) {
        try {
            var req = this.req;
            var getGroupData = await ChatGroup.findOne({ id: inputs.chatGroupId });
            if (!getGroupData) {
                return exits.normalError({
                    status: false,
                    message: sails.__("Invalid group data"),
                });
            }

            var deleteMessageIds = [];
            try {
                deleteMessageIds = inputs.deleteMessageIds;
            } catch (e) {
                return exits.normalError({
                    status: false,
                    message: sails.__("Invalid deleteMessageIds array"),
                });
            }

            if (deleteMessageIds.length <= 0) {
                return exits.normalError({
                    status: false,
                    message: sails.__("Invalid deleteMessageIds array"),
                });
            }

            var isMessageExist = await Chat.find({
                id: { in: deleteMessageIds },
                senderId: req.loggedInUser.id,
            });
            var messagesIds = _.map(isMessageExist, "id");

            if (messagesIds.length > 0) {
                await GroupMessageStatus.destroy({ messageId: { 'in': messagesIds } });
                await Chat.destroy({ id: { 'in': messagesIds }, senderId: req.loggedInUser.id });
                var sendData = {
                    action: "deleteMessage",
                    data: {
                        chatGroupId: inputs.chatGroupId,
                        messagesIds: messagesIds,
                    },
                    message: sails.__("Delete message successfully"),
                };

                User.publish(
                    [getGroupData.creatorId, getGroupData.userId],
                    sendData,
                    req
                );
            }

            var getLastMessage = await Chat.find({
                where: { chatGroupId: inputs.chatGroupId }
            }).sort('id DESC').limit(1);

            getLastMessage = getLastMessage.length ? getLastMessage[0] : [];
            if (getLastMessage) {
                await ChatGroup.update({
                    id: inputs.chatGroupId,
                }).set({
                    lastMsgId: getLastMessage.id
                });

                if (messagesIds.includes(getGroupData['lastMsgId'])) {
                    req.loggedInUser = await sails.helpers.socket.model.exportToJson(req.loggedInUser);
                    getLastMessage.senderImage = req.loggedInUser.defaultImageUrl;
                    getLastMessage.senderName = req.loggedInUser.name;
                    getLastMessage.senderSecretId = req.loggedInUser.secretId;

                    var sendData = {
                        action: 'sendMessage',
                        data: {
                            chatMessage: getLastMessage,
                        },
                        message: sails.__('publish message successfully')
                    };

                    User.publish([getGroupData.creatorId, getGroupData.userId], sendData, req);
                }
            }

            return exits.success({
                status: true,
                message: sails.__("Delete message successfully"),
            });
        } catch (error) {
            return exits.normalError({
                status: false,
                error: error,
                message: "Something went wrong",
            });
        }
    },
};
