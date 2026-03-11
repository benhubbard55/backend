/* eslint-disable eqeqeq */
module.exports = {
    friendlyName: "Create account",
    description: "",
    inputs: {
        senderId: {
            type: "number",
            required: true,
        },
        receiverId: {
            type: "number",
            defaultsTo: 0,
        },
        notificationType: {
            type: "string",
            required: true,
        },
        redirectId: {
            type: "number",
            defaults: null,
        },
        title: {
            type: "string",
            required: true,
        },
        description: {
            type: "string",
            required: true,
        },
        isFromAdmin: {
            type: "boolean",
            defaultsTo: false,
        },
        showTo: {
            type: "string",
        },
    },

    exits: {
        success: {},
        invalid: {},
        badRequest: {},
    },

    fn: async function (inputs, exits) {
        const {
            senderId,
            receiverId,
            notificationType,
            redirectId,
            title,
            description,
        } = inputs;

        await User.update({
            id: receiverId,
            isPendingUnReadNotification: false,
        }).set({
            isPendingUnReadNotification: true,
        });

        if (notificationType == "adminBroadcast") {
            delete inputs.receiverId;
        }
        await Notification.create({ ...inputs, showTo: inputs.showTo || null });

        const findUnreadCount = await Notification.count({
            or: [{ receiverId: receiverId }, { notificationType: "adminBroadcast" }],
            notificationType: { nin: ["chat"] },
            isRead: false,
        });

        var sendData = {
            action: "getNotificationUnreadCount",
            data: {
                getUnreadCount: findUnreadCount || 0,
            },
            message: "publish notification unread count successfully",
        };

        await User.publish([receiverId], sendData);

        const findDeviceToken = await DeviceToken.find({ userId: receiverId });
        const tokens = _.map(findDeviceToken, "token");

        if (tokens.length > 0) {
            const redirectObj = {
                likeMusic: "musicDetails",
                followArtist: "artistDetails",
                buyMusic: "musicDetails",
                adminBroadCast: "",
                chat: "chat",
            };

            let additionalPayload = {
                purpose: notificationType || "",
                redirectId: `${redirectId}` || "",
                redirectTo: redirectObj[notificationType] || "",
            };

            if (notificationType == "chat") {
                const findChat = await Chat.findOne({
                    id: redirectId,
                });
                additionalPayload = {
                    ...additionalPayload,
                    senderId: `${findChat?.senderId}` || "",
                    receiverId: `${findChat?.receiverId}` || "",
                    chatGroupId: `${findChat?.chatGroupId}` || "",
                };
            }

            await sails.helpers.firebase.sendToDevice.with({
                title: title,
                body: description,
                deviceToken: tokens,
                additionalData: additionalPayload,
            });
        }

        return exits.success(true);
    },
};
