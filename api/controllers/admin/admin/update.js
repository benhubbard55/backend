module.exports = {
    friendlyName: "Update",
    description: "Update admin.",
    inputs: {
        id: {
            type: "number",
        },
        firstName: {
            type: "string",
            required: true,
        },
        lastName: {
            type: "string",
            required: true,
        },
        email: {
            required: true,
            type: "string",
            isEmail: true,
            description: "The email address for the new account, e.g. m@example.com.",
            extendedDescription: "Must be a valid email address.",
        },
        password: {
            type: "string",
            maxLength: 15,
            minLength: 6,
            description: "The unencrypted password to use for the new account.",
        },
    },
    exits: {
        redirect: {
            responseType: "redirect",
        },
    },

    fn: async function (inputs, exits) {
        let objAdmin = {
            firstName: inputs.firstName,
            lastName: inputs.lastName,
            email: inputs.email,
        };
        if (inputs.password) {
            objAdmin.password = await sails.helpers.passwords.hashPassword(
                inputs.password
            );
        }

        var isEmailExist = await Admin.find({
            id: { nin: [this.req.params["adminId"]] },
            email: inputs.email,
        });
        if (isEmailExist.length > 0) {
            this.req.session.flash = {
                type: "error",
                message: "Email is already exist",
            };
        } else {
            var admin = await Admin.update({
                id: this.req.params["adminId"],
            }).set(objAdmin);

            this.req.session.admin = admin;
            this.req.session.save((err) => {
                if (err) {
                    console.error('Error saving session:', err);
                }
            });

            this.req.session.flash = {
                type: "success",
                message: "Update admin successfully",
            };
        }

        throw {
            redirect: "/admin/admins",
        };
    },
};
