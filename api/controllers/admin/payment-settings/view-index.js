module.exports = {
    exits: {
        success: {
            responseType: "view",
            viewTemplatePath: "admin/payment-settings/index",
        },
        redirect: {
            responseType: "redirect",
        },
    },

    fn: async function (inputs, exits) {
        const findTax = await PaymentSetting.find({});
        return exits.success({
            record1: findTax[0] || {},
            record2: findTax[1] || {},
        });
    },
};
