module.exports = {
    inputs: {},
    exits: {
        success: sails.config.globals.statusCodes.success,
    },
    fn: async function (inputs, exits) {
        try {
            const loginUserData = this.req.loggedInUser;

            const findUnreadCount = await Notification.count({
                or: [
                    { receiverId: loginUserData?.id },
                    { notificationType: "adminBroadcast" },
                ],
                notificationType: { nin: ["chat"] },
                isRead: false
            });

            return exits.success({
                status: true,
                message: "Count get successfully",
                getUnreadCount: findUnreadCount,
                isPendingUnReadNotification: loginUserData?.isPendingUnReadNotification,
            });
        } catch (error) {
            return exits.invalid({
                status: false,
                message: error,
            });
        }
    },
};
