module.exports = {
    friendlyName: "Login",
    inputs: {
        email: {
            description: 'The email to try in this attempt, e.g. "irl@example.com".',
            type: "string",
            required: true,
        },
        password: {
            description:
                'The unencrypted password to try in this attempt, e.g. "passwordlol".',
            type: "string",
            required: true,
        },
    },
    exits: {
        success: {
            description: "The requesting user agent has been successfully logged in.",
        },
        badCombo: {
            description: `The provided email and password combination does not
      match any user in the database.`,
            responseType: "unauthorized",
        },
        redirect: {
            description: "The requesting user is already logged in.",
            responseType: "redirect",
        },
    },

    fn: async function (inputs) {
        var userRecord = await Admin.findOne({
            email: inputs.email.toLowerCase(),
        });
        if (!userRecord) {
            throw "badCombo";
        }
        await sails.helpers.passwords
            .checkPassword(inputs.password, userRecord.password)
            .intercept("incorrect", "badCombo");
        if (inputs.rememberMe) {
            if (this.req.isSocket) {
                sails.log.warn(
                    "Received `rememberMe: true` from a virtual request, but it was ignored\n" +
                    "because a browser's session cookie cannot be reset over sockets.\n" +
                    "Please use a traditional HTTP request instead."
                );
            } else {
                this.req.session.cookie.maxAge =
                    sails.config.custom.rememberMeCookieMaxAge;
            }
        }
        this.req.session.admin = userRecord;
        this.req.session.adminId = userRecord.id;
        throw {
            redirect: "/admin/dashboard",
        };
    },
};
