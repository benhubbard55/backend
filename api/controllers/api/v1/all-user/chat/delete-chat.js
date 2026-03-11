module.exports = {
    friendlyName: "Delete chat",
    description: "",
    inputs: {
        opponetUserId: {
            type: "number",
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
        var req = this.req;
        const defaultUTC = moment.utc().format("YYYY-MM-DD HH:mm:ss");
        var isOpponentUserExist = await User.findOne({ id: inputs.opponetUserId });
        if (!isOpponentUserExist) {
            return exits.normalError({
                status: false,
                message: "Invalid opponent userId",
            });
        }

        var isChatGroupExist = await ChatGroup.findOne({
            id: inputs.chatGroupId,
            or: [
                { creatorId: req.loggedInUser.id, userId: isOpponentUserExist.id },
                { creatorId: isOpponentUserExist.id, userId: req.loggedInUser.id },
            ],
        });
        if (!isChatGroupExist) {
            return exits.normalError({
                status: false,
                message: sails.__("Chat group not exist"),
            });
        }

        if (isChatGroupExist.userId === req.loggedInUser.id) {
            await ChatGroup.update({ id: inputs.chatGroupId }).set({
                isDeletedFromUserSide: true,
                removeFromGroupTimeForUserSide: defaultUTC,
            });
        } else if (isChatGroupExist.creatorId === req.loggedInUser.id) {
            await ChatGroup.update({ id: inputs.chatGroupId }).set({
                isDeletedFromCreatorSide: true,
                removeFromGroupTimeForCreatorSide: defaultUTC,
            });
        }

        return exits.success({
            status: true,
            message: "Deleted chat from your list successfully",
        });
    },
};
