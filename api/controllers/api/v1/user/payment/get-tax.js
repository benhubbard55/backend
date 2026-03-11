module.exports = {
    inputs: {},
    exits: {
        success: sails.config.globals.statusCodes.success,
    },
    fn: async function (inputs, exits) {
        try {
            const findTax = await PaymentSetting.findOne({ keyName: "stripe_fees" });
            return exits.success({
                status: true,
                message: "Tax fetched successfully",
                data: findTax || 0,
            });
        } catch (error) {
            return exits.success({
                status: false,
                message: serverErrorMsg,
            });
        }
    },
};
