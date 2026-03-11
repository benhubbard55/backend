module.exports = {
    friendlyName: "Send OTP",
    description: "",
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
        conflict: sails.config.globals.statusCodes.conflict,
    },
    fn: async function (inputs, exits) {
        try {
            let { email } = inputs;

            const findEmail = await User.findOne({
                email: email,
                isVerified: 0,
                isDeleted: 0,
            });

            if (findEmail) {
                if (findEmail?.isVerified) {
                    return exits.conflict({
                        status: false,
                        message: "User already verified!",
                    });
                }
                const { otp } = await sails.helpers.generateAndSendOtp();
                await User.updateOne({
                    id: findEmail?.id,
                }).set({
                    otp: otp,
                });

                await sails.helpers.sendEmail.with({
                    to: email,
                    subject: "Verification Code",
                    template: "email-register-otp",
                    typeOfSend: "queue", // 'now', 'queue', 'preview'
                    layout: "layout-email",
                    templateData: {
                        name: findEmail?.name,
                        otp: otp,
                    },
                });

                return exits.success({
                    status: true,
                    message: "OTP has been sent to your email",
                });
            } else {
                const findUserByVerifiedEmail = await User.findOne({
                    email,
                    isVerified: 1,
                    isDeleted: 0,
                });
                if (findUserByVerifiedEmail) {
                    return exits.conflict({
                        status: false,
                        message: "User already verified",
                    });
                }

                return exits.notFound({
                    status: false,
                    message: "User not found",
                });
            }
        } catch (error) {
            return exits.invalid({
                status: false,
                message: serverErrorMsg,
            });
        }
    },
};
