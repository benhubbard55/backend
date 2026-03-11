module.exports = {
    friendlyName: "Update create",
    description: "",
    inputs: {
        customerId: {
            type: "string",
            required: true,
        },
        amount: {
            type: "number",
            require: true,
        },
        // cardId: {
        //     type: "string",
        //     required: true,
        // },
        metaData: {
            type: "ref",
            required: false,
        },
    },
    exits: {
        success: {
            description: "All done.",
        },
    },
    fn: async function (inputs, exits) {
        global.stripeSDK.paymentIntents
            .create({
                amount: Math.round(inputs.amount * 100),
                currency: "usd",
                // capture_method: "manual",
                customer: inputs.customerId,
                payment_method_types: ["card"],
                // payment_method: inputs.cardId,
                // confirm: true,
                metadata: inputs.metaData || {},
            })
            .then(
                function (result) {
                    return exits.success({ ...result, status: true });
                },
                function (err) {
                    // console.log("err :>> ", err);
                    return exits.success({ ...err, status: false });
                }
            );
    },
};
