module.exports = {
    friendlyName: "Customer create",
    description: "",
    inputs: {
        body: {
            type: "ref",
            required: true,
        },
    },
    exits: {
        success: {
            description: "All done.",
        },
    },
    fn: async function (inputs, exits) {
        global.stripeSDK.accounts
            .create(inputs.body)
            .then(
                function (result) {
                    return exits.success({ ...result, status: true });
                },
                function (err) {
                    console.log('create Account err :>> ', err);
                    return exits.success({ ...err, status: false });
                }
            );
    },
};
