module.exports = {
    friendlyName: "Is chat exist",
    description: "",
    inputs: {
        opponentUserId: {
            type: "string",
            required: true,
        },
    },
    exits: {
        normalError: sails.config.globals.statusCodes.normalError,
    },

    fn: async function (inputs, exits) {
        try {
            var req = this.req;
            var isUserExist = await User.findOne({
                id: inputs.opponentUserId,
                isDeleted: false,
            });
            if (!isUserExist || isUserExist?.id == req.loggedInUser.id) {
                return exits.normalError({
                    status: false,
                    message: sails.__("Invalid receiver Id"),
                });
            }

            var isGroupCreated = await ChatGroup.find({
                or: [
                    { creatorId: req.loggedInUser.id, userId: isUserExist.id },
                    { creatorId: isUserExist.id, userId: req.loggedInUser.id },
                ],
            });

            let chatGroupId =
                isGroupCreated.length > 0 ? isGroupCreated[0]["id"] : await isChatGroupExistCheck(
                    req.loggedInUser.id,
                    isUserExist.id
                );
            if (isGroupCreated.length <= 0) {
                return exits.normalError({
                    status: false,
                    message: sails.__("Chat group not exist"),
                    isChatGroupExist: false,
                    chatGroupId: chatGroupId,
                });
            } else {
                return exits.success({
                    status: true,
                    message: sails.__("Chat group is exist"),
                    isChatGroupExist: true,
                    chatGroupId: chatGroupId,
                });
            }
        } catch (error) {
            return exits.normalError({
                status: false,
                error: error,
                message: "Something went wrong",
            });
        }
    },
};

async function isChatGroupExistCheck(senderId, receiverId) {
    var title = "senderId" + senderId + "receiverId" + receiverId;
    var isGroupCreated = await ChatGroup.find({
        or: [
            { creatorId: senderId, userId: receiverId },
            { creatorId: receiverId, userId: senderId },
        ],
    });
    let chatGroupId = isGroupCreated.length > 0 ? isGroupCreated[0]["id"] : null;
    if (isGroupCreated.length <= 0) {
        let secretId = await sails.helpers.codeGenerator();
        var createdChatGroup = await ChatGroup.create({
            creatorId: senderId,
            userId: receiverId,
            title: title,
            type: "direct",
            secretId: secretId,
        });
        chatGroupId = createdChatGroup?.id;
    }
    return chatGroupId;
}
