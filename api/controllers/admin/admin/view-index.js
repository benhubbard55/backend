module.exports = {
    friendlyName: "View index",
    description: 'Display "Index" page.',
    exits: {
        success: {
            responseType: "view",
            viewTemplatePath: "admin/admin-crud/index",
        },
        redirect: {
            responseType: "redirect",
        },
    },

    fn: async function (inputs, exits) {
        return exits.success();
    },
};
