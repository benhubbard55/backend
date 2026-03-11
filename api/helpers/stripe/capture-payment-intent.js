module.exports = {
    friendlyName: "Update create",
    description: "",
    inputs: {
        paymentIntentId: {
            type: "string",
            required: true,
        },
    },
    exits: {
        success: {
            description: "All done.",
        },
    },
    fn: async function (inputs, exits) {
        global.stripeSDK.paymentIntents.capture(inputs.paymentIntentId).then(
            function (result) {
                return exits.success({ ...result, status: true });
            },
            function (err) {
                return exits.success({ ...err, status: false });
            }
        );
    },
};
