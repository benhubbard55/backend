module.exports = {
    friendlyName: "Customer create",
    description: "",
    inputs: {
        name: {
            type: "string",
            required: true,
        },
        email: {
            type: "string",
            required: true,
        },
        phoneNo: {
            type: "string",
            required: false,
        },
    },
    exits: {
        success: {
            description: "All done.",
        },
    },
    fn: async function (inputs, exits) {
        global.stripeSDK.customers
            .create({
                name: inputs.name,
                email: inputs.email,
                phone: inputs.phoneNo,
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
