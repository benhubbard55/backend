module.exports = {
    inputs: {},
    exits: {
        success: {
            responseType: "view",
            viewTemplatePath: "pages/terms-condition",
        },
        redirect: {
            responseType: "redirect",
        },
    },

    fn: async function (inputs, exits) {
        var termsData = await Terms.find();

        return exits.success({
            message: "Fetch the data successfully",
            data: termsData[0]?.description,
        });
    },
};
