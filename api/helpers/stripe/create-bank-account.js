module.exports = {
    friendlyName: "Create bank account",
    description: "",
    inputs: {
        customerId: {
            type: "string",
            required: true,
        },
        bankToken: {
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
        global.stripeSDK.customers
            .createSource(inputs?.customerId, {
                source: inputs.bankToken,
            })
            .then(
                function (result) {
                    return exits.success({ ...result, status: true });
                },
                function (err) {
                    return exits.success({ ...err, status: false });
                }
            );
    },
};
