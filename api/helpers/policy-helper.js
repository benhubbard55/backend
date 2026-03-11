module.exports = {
    friendlyName: "Policy helper",
    description: "",
    inputs: {
        userId: {
            type: "number",
            required: true,
        },
        policyType: {
            type: "string",
            required: true,
        },
    },

    exits: {
        success: {
            description: "All done.",
        },
        permissionError: {
            description: "Don't have permission",
            message: "Don't have permission",
        },
    },

    fn: async function (inputs, exits) {
        let userResult = await User.findOne({ id: inputs.userId }).populate(
            "roles"
        );

        if (userResult.roles.length == 0)
            throw { permissionError: { message: "Don't have permission" } };

        let permissions = await sails.helpers.menuHelper.with({
            roles: userResult.roles,
        });

        if (!permissions.includes(inputs.policyType))
            throw { permissionError: { message: "Don't have permission" } };

        exits.success();
    },
};
