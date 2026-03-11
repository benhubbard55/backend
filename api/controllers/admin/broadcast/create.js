module.exports = {
    friendlyName: "Create",

    description: "Create BroadCast.",

    inputs: {
        title: {
            type: "string",
            required: true,
        },
        showTo: {
            type: "string",
            isIn: ["users", "artists", "allUsers"],
            defaultsTo: "users",
        },
        description: {
            type: "string",
            required: true,
        },
    },
    exits: {
        invalid: sails.config.globals.statusCodes.invalid,
        redirect: {
            responseType: "redirect",
        },
    },

    fn: async function (inputs, exits) {
        const { title, description, showTo } = inputs;

        const userList = {
            users: [1],
            artists: [2],
            allUsers: [1, 2],
        };

        const findUser = await User.find({
            isActive: true,
            isVerified: true,
            isDeleted: false,
            userType: { in: userList[showTo] },
        });
        for (let i = 0; i < findUser.length; i++) {
            const userData = findUser[i];
            await sails.helpers.sendEmail.with({
                to: userData?.email,
                subject: "New Update",
                template: "email-broadcast",
                typeOfSend: "queue", // 'now', 'queue', 'preview'
                layout: "layout-email",
                templateData: {
                    title: title,
                    description: description,
                },
            });
        }
        const broadcastData = await BroadCast.create(inputs).fetch();

        await sails.helpers.addNotification.with({
            senderId: this.req.session.adminId,
            receiverId: 0,
            notificationType: "adminBroadcast",
            redirectId: broadcastData?.id,
            title: title,
            description: description,
            isFromAdmin: true,
            showTo: showTo,
        });

        await User.update({
            isPendingUnReadNotification: false,
        }).set({
            isPendingUnReadNotification: true,
        });

        this.req.session.flash = {
            type: "success",
            message: "Broadcast successfully!",
        };
        throw {
            redirect: "/admin/broadcast",
        };
    },
};
