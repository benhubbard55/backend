module.exports = {
    friendlyName: "Confirm email",
    inputs: {
        token: {
            type: "string",
            description: "The confirmation token from the email.",
            example: "4-32fad81jdaf$329",
        },
        id: {
            description: "The confirmation token from the email.",
            example: "4-32fad81jdaf$329",
        },
    },
    exits: {
        success: {
            viewTemplatePath: "admin/admin-crud/edit",
        },
        redirect: {
            responseType: "view",
            description:
                "Email address confirmed and requesting user logged in.  Since this looks like a browser, redirecting...",
            viewTemplatePath: "confirmed-email",
        },
        invalidOrExpiredToken: {
            responseType: "expired",
            description:
                "The provided token is expired, invalid, or already used up.",
        },
    },

    fn: async function (inputs, exits) {
        // If no token was provided, this is automatically invalid.
        if (!inputs.token) {
            //   return exits.invalidOrExpiredToken({
            //     message: 'Invalid Token'
            //   });
        }

        // Get the user with the matching email token.
        var user = await User.findOne({
            id: inputs.id,
        });

        // match token with current token
        if (!user) {
            return exits.invalidOrExpiredToken({
                message: "Invalid Token",
            });
        }

        if (user.verificationToken != inputs.token) {
            return exits.invalidOrExpiredToken({
                message: "Invalid Token",
            });
        }

        await User.updateOne({
            id: inputs.id,
        }).set({
            verificationToken: "",
        });

        // this.req.session.userId = user.id;
        if (this.req.wantsJSON) {
            return exits.success({
                message: "your email has been verified successfully",
            });
        } else {
            exits.redirect();
        }
    },
};
