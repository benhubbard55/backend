module.exports = {
    friendlyName: "Forgot password",
    inputs: {
        verificationToken: {
            type: "string",
            required: true,
        },
        password: {
            type: "string",
            required: true,
        },
    },
    exits: {},
    fn: async function (inputs, exits) {
        try {
            var res = this.res;
            const { verificationToken, password } = inputs;

            var findUser = await User.findOne({ verificationToken });
            if (!findUser) {
                return res.view("emails/email-forgot-password-response", {
                    name: "Uphonu_user",
                    message: "Invalid token",
                    success: false,
                });
            }

            const checkValidity = await sails.helpers.checkOtpTime(
                findUser.forgotTime
            );
            if (!checkValidity) {
                return res.view("emails/email-forgot-password-response", {
                    name: findUser.name,
                    message: forgotOtpLinkExpireMessage,
                    success: false,
                });
            }

            var updatedData = await User.update({ id: findUser.id }).set({
                password: password,
                forgotTime: null,
                verificationToken: sails.helpers.strings.random("url-friendly"),
            });
            if (!updatedData) {
                return res.view("emails/email-forgot-password-response", {
                    name: findUser.name,
                    message: "Password not change successfully",
                    success: false,
                });
            }

            return res.view("emails/email-forgot-password-response", {
                name: findUser.name,
                message: "Password updated successfully!",
                success: true,
            });
        } catch (error) {
            return res.view("emails/email-forgot-password-response", {
                name: findUser.name,
                message: serverErrorMsg,
                success: false,
            });
        }
    },
};
