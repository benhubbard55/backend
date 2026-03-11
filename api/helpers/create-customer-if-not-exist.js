/* eslint-disable eqeqeq */
module.exports = {
    friendlyName: "Create account",
    description: "",
    inputs: {
        loginUserData: {
            type: "ref",
            required: true,
        },
    },

    exits: {
        success: {},
        invalid: {},
        badRequest: {},
    },

    fn: async function (inputs, exits) {
        const { loginUserData } = inputs;
        let customerId = loginUserData?.customerId;
        if (!customerId) {
            const data = await sails.helpers.stripe.createCustomer.with({
                name: loginUserData?.name,
                email: loginUserData?.email,
                phoneNo: `${loginUserData?.countryCode}-${loginUserData?.phoneNo}`,
            });
            customerId = data?.status ? data?.id : null;
            await User.update({
                id: loginUserData?.id,
            }).set({
                customerId: customerId,
            });
        }
        return exits.success(customerId);
    },
};
