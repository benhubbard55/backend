module.exports = {
    friendlyName: "Create",
    description: "Create admin.",
    inputs: {
        firstName: {
            type: "string",
            required: true,
        },
        lastName: {
            type: "string",
            required: true,
        },
        email: {
            unique: true,
            required: true,
            type: "string",
            isEmail: true,
            description: "The email address for the new account, e.g. m@example.com.",
            extendedDescription: "Must be a valid email address.",
        },
        password: {
            required: true,
            type: "string",
            maxLength: 15,
            minLength: 6,
            example: "passwordlol",
            description: "The unencrypted password to use for the new account.",
        },
    },

    exits: {
        invalid: {
            statusCode: 409,
            description: "Name and City is required.",
        },
        redirect: {
            responseType: "redirect",
        },
    },

    fn: async function (inputs, exits) {
        var isAdminExist = await Admin.findOne({ email: inputs.email });
        if (isAdminExist) {
            this.req.session.flash = {
                type: "error",
                message: "Admin already exist",
            };
            return this.res.redirect("/admin/create");
        }

        var userRecord = await Admin.create({
            firstName: inputs.firstName,
            lastName: inputs.lastName,
            email: inputs.email,
            password: await sails.helpers.passwords.hashPassword(inputs.password),
        }).fetch();

        if (!userRecord) {
            return exits.invalid({
                message: "invalid",
            });
        }

        this.req.session.flash = {
            type: "success",
            message: "Admin create successfully",
        };

        throw {
            redirect: "/admin/admins",
        };
    },
};
