module.exports = {
    inputs: {},
    exits: {
        success: {
            responseType: "view",
            viewTemplatePath: "pages/privacy-policy",
        },
        redirect: {
            responseType: "redirect",
        },
    },

    fn: async function (inputs, exits) {
        var policyData = await Policy.find()

        return exits.success({
            message: 'Fetch the data successfully',
            data: policyData[0]?.description
        });
    },
};
