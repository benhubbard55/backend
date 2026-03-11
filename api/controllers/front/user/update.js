module.exports = {
    friendlyName: "Update",

    description: "Update user.",

    inputs: {
        userId: {
            type: "number",
        },
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
            unique: true,
            required: true,
            type: "string",
            isEmail: true,
            description: "The email address for the new account, e.g. m@example.com.",
            extendedDescription: "Must be a valid email address.",
        },
        password: {
            //   required: true,
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
        // return "get in update";
        let objUser = {
            firstName: inputs.firstName,
            lastName: inputs.lastName,
            email: inputs.email,
        };

        if (inputs.password) {
            //   objUser.password = await sails.helpers.passwords.hashPassword(inputs.password);
            objUser.password = inputs.password;
        }

        var updatedUser = await User.update({
            id: inputs.userId,
        }).set(objUser);
        // .fetch();

        if (this.req.wantsJSON) {
            return this.res.status(200).send({
                message: "user has been updated successfully",
                data: updatedUser,
            });
        } else {
            throw {
                redirect: "/admin/users",
            };
        }
    },
};
