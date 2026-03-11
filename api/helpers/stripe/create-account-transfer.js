module.exports = {
    inputs: {
        amount: {
            type: "number",
            required: true,
        },
        accountId: {
            type: "string",
            required: true,
        },
    },
    exits: {},
    fn: async function (inputs, exits) {
        const { amount, accountId } = inputs;
        global.stripeSDK.transfers
            .create({
                amount: Math.round(amount * 100),
                currency: "usd",
                destination: accountId,
            })
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
