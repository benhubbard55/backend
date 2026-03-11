module.exports = {
    friendlyName: "Menu helper",
    description: "",
    inputs: {
        roles: {
            type: "ref",
            required: true,
        },
    },
    exits: {
        success: {
            description: "All done.",
        },
    },

    fn: async function (inputs, exits) {
        let roleIds = _.map(inputs.roles, "id");

        let roleResult = await Role.find({ id: roleIds }).populate("permissions");

        let permissions = [];
        _.each(roleResult, function (role) {
            permissions = permissions.concat(role.permissions);
        });
        let rolePermissions = _.map(permissions, "name");

        rolePermissions = _.uniqBy(rolePermissions);

        return exits.success(rolePermissions);
    },
};
