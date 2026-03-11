module.exports = {
    exits: {
        success: {
            responseType: "view",
            viewTemplatePath: "admin/inquiry/index",
        },
        redirect: {
            responseType: "redirect",
        },
    },

    fn: async function (inputs, exits) {
        return exits.success();
    },
};
