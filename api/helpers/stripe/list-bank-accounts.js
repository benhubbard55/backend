module.exports = {
    inputs: {
        accountId: {
            type: "ref",
            required: true,
        },
    },
    exits: {},
    fn: async function (inputs, exits) {
        global.stripeSDK.accounts
            .listExternalAccounts(inputs.accountId, {
                object: "bank_account",
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
