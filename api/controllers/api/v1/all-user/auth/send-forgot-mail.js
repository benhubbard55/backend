module.exports = {
    friendlyName: "Send Forgot Mail",
    inputs: {
        email: {
            required: true,
            isEmail: true,
            type: "string",
        },
    },
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
        notFound: sails.config.globals.statusCodes.notFound,
    },
    fn: async function (inputs, exits) {
        try {
            const { email } = inputs;

            const userRecord = await User.findOne({
                email,
            });

            if (!userRecord) {
                return exits.notFound({
                    status: false,
                    message: "User not found",
                });
            }

            await User.updateOne({
                email,
            }).set({
                forgotTime: moment().utc().format("YYYY-MM-DD HH:mm:ss"),
            });

            await sails.helpers.sendEmail.with({
                to: userRecord?.email,
                subject: "Forgot password",
                template: "email-reset-password",
                typeOfSend: "queue", // 'now', 'queue', 'preview'
                layout: "layout-email",
                templateData: {
                    fullName: userRecord?.name,
                    token: userRecord?.verificationToken,
                },
            });

            return exits.success({
                status: true,
                message: "Reset password mail send successfully!",
            });
        } catch (error) {
            return exits.invalid({
                status: false,
                message: serverErrorMsg,
            });
        }
    },
};
