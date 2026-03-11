module.exports = {
    friendlyName: "Get profile",
    inputs: {
        type: {
            type: "string",
            required: false,
        }
    },
    exits: {
        success: sails.config.globals.statusCodes.success,
    },
    fn: async function (inputs, exits) {
        const loginUserData = this.req.loggedInUser;

        let whereCondition = {
            or: [
                { receiverId: loginUserData?.id },
                { notificationType: "adminBroadcast" },
            ],
            notificationType: { nin: ["chat"] },
        };

        if (inputs.type && inputs.type !== "all") {
            whereCondition.notificationType.in = [inputs.type];
        }

        const result = await sails.helpers.getPaginationList.with({
            request: this.req,
            modelName: "Notification",
            whereCondition,
            sortBy: "id desc",
        });

        for (let i = 0; i < result.data.length; i++) {
            const notificationData = result.data[i];
            if (notificationData?.isFromAdmin) {
                const findAdmin = await Admin.findOne({
                    id: notificationData?.senderId,
                });
                notificationData.senderId = findAdmin;
                notificationData.senderId.name = `${findAdmin?.firstName} ${findAdmin?.lastName}`;
            } else {
                const findUser = await User.findOne({
                    id: notificationData?.senderId,
                });
                notificationData.senderId = findUser;
            }

            if (
                ["likeMusic", "buyMusic"].includes(notificationData?.notificationType)
            ) {
                const findMusic = await Music.findOne({
                    id: notificationData?.redirectId,
                });
                notificationData.musicData = findMusic || {};
            } else if (notificationData?.notificationType == "followArtist") {
                const findArtist = await User.findOne({
                    id: notificationData?.redirectId,
                });
                notificationData.followingUserDetails = findArtist || {};
            } else {
            }
        }

        const ids = _.map(result.data, "id");
        await Notification.update({
            id: { in: ids },
            receiverId: loginUserData?.id,
            notificationType: { nin: ["adminBroadcast"] },
            isRead: false,
        }).set({ isRead: true });

        if (loginUserData?.isPendingUnReadNotification) {
            await User.update({
                id: loginUserData?.id,
                isPendingUnReadNotification: true,
            }).set({
                isPendingUnReadNotification: false,
            });
        }

        return exits.success(result);
    },
};
