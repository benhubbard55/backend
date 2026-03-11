module.exports = {
    friendlyName: "Create payout",
    description: "",
    inputs: {
        amount: {
            type: "number",
            required: true,
        },
        bankAccount: {
            type: "string",
            required: true,
        },
        accountId: {
            type: "string",
            required: true,
        },
        metadata: {
            type: "ref",
            defaultsTo: {},
        },
    },
    exits: {
        success: {
            description: "All done.",
        },
    },
    fn: async function (inputs, exits) {
        const { amount, bankAccount, accountId, metadata } = inputs;

        global.stripeSDK.payouts
            .create(
                {
                    amount: amount * 100,
                    currency: "usd",
                    method: "instant",
                    destination: bankAccount,
                    metadata: metadata || {},
                },
                {
                    stripeAccount: accountId,
                }
            )
            .then(
                function (result) {
                    return exits.success({ ...result, status: true });
                },
                function (err) {
                    console.log("err :>> ", err);
                    return exits.success({ ...err, status: false });
                }
            );
    },
};
