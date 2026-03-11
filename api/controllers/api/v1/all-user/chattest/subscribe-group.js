module.exports = {
    friendlyName: "Subscribe group",
    description: "",
    inputs: {
        groupId: {
            type: "number",
            required: true,
        },
        userId: {
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
            memberId: inputs.userId,
        });
        if (!subscribeGroup) {
            return exits.normalError({
                message: sails.__("User is not member of group"),
            });
        }

        ChatGroupMember.subscribe(req, [subscribeGroup.id]);
        var updatedChatStatusWithRead = await GroupMessageStatus.update({
            groupId: inputs.groupId,
            receiverId: inputs.userId,
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

        return exits.success({
            status: true,
            message: sails.__("Update Message status successfully"),
        });
    },
};
