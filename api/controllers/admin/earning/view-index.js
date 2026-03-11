module.exports = {
    exits: {
        success: {
            responseType: "view",
            viewTemplatePath: "admin/earning/index",
        },
        redirect: {
            responseType: "redirect",
        },
    },

    fn: async function (inputs, exits) {
        return exits.success();
    },
};
