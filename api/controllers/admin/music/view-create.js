module.exports = {
    friendlyName: "View user create",
    description: 'Display "User Create" page.',
    exits: {
        success: {
            viewTemplatePath: "admin/music/create",
        },
    },

    fn: async function (inputs, exits) {
        return exits.success({ userRecord: "", });
    },
};
