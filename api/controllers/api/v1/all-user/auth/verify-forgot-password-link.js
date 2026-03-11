module.exports = {
    friendlyName: "Verify forgot password link",
    description: "",
    inputs: {
        verificationToken: {
            type: "string",
            required: true,
        },
    },
    exits: {},

    fn: async function (inputs, exits) {
        var res = this.res;

        var findUser = await User.findOne({
            verificationToken: inputs.verificationToken,
        });
        if (!findUser) {
            return res.view("emails/email-forgot-password-response", {
                name: "Uphony_user",
                message: forgotOtpLinkExpireMessage,
                success: false,
            });
        }
        if (!findUser.forgotTime) {
            return res.view("emails/email-forgot-password-response", {
                name: findUser.name,
                message: forgotOtpLinkExpireMessage,
                success: false,
            });
        } else if (!(await sails.helpers.checkOtpTime(findUser.forgotTime))) {
            return res.view("emails/email-forgot-password-response", {
                name: findUser.name,
                message: forgotOtpLinkExpireMessage,
                success: false,
            });
        } else {
            return res.view("emails/email-forgot-view", {});
        }
    },
};
