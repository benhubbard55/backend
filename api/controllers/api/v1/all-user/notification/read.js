module.exports = {
    friendlyName: "Get profile",
    inputs: {
        isReadAll: {
            type: "boolean",
            defaultsTo: false,
        },
        ids: {
            type: "ref",
            required: false,
        },
    },
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
        badRequest: sails.config.globals.statusCodes.badRequest,
    },
    fn: async function (inputs, exits) {
        try {
            const { isReadAll, ids } = inputs;
            const loginUserData = this.req.loggedInUser;
            if (ids.length > 0 || isReadAll) {
                if (isReadAll) {
                    await Notification.update({
                        receiverId: loginUserData?.id,
                        notificationType: { nin: ["chat"] },
                    }).set({
                        isRead: true,
                    });
                } else {
                    await Notification.update({
                        id: { in: ids },
                        receiverId: loginUserData?.id,
                    }).set({ isRead: true });
                }
                return exits.success({
                    status: true,
                    message: "Notification read successfully!",
                });
            } else {
                return exits.badRequest({
                    status: false,
                    message: "Please select atleast one parameter",
                });
            }
        } catch (error) {
            return exits.invalid({
                status: false,
                message: serverErrorMsg,
                error: error,
            });
        }
    },
};
