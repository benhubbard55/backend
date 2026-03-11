module.exports = {
    friendlyName: "View Users index",

    description: 'Display "Index" page.',

    exits: {
        success: {
            responseType: "view",
            viewTemplatePath: "admin/user/index",
        },
        redirect: {
            responseType: "redirect",
        },
    },

    fn: async function (inputs, exits) {
        return exits.success();
    },
};
