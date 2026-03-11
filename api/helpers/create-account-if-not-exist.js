/* eslint-disable eqeqeq */
module.exports = {
    inputs: {
        loginUserData: {
            type: "ref",
            required: true,
        },
        btok: {
            type: "string",
            required: false,
        },
        req: {
            type: "ref",
            required: true,
        },
    },

    exits: {},

    fn: async function (inputs, exits) {
        const { loginUserData } = inputs;
        let accountId = loginUserData?.accountId;
        const ip =
            sails.config.mode === "development"
                ? "192.168.0.0"
                : inputs.req.ip.split(":").pop();
        if (!accountId) {
            var accountCreationDetails = {
                type: "custom",
                business_profile: {
                    product_description: "Uphony connect account for payout",
                },
                external_account: inputs.btok,
                country: "US",
                requested_capabilities: ["transfers"],
                business_type: "individual",
                individual: {
                    first_name: loginUserData?.name,
                    last_name: loginUserData?.name,
                    email: loginUserData?.email,
                    phone: "+14155552671",
                    address: {
                        line1: "",
                        city: "",
                        state: "",
                        postal_code: "",
                        country: "us",
                    },
                    dob: {
                        day: 1,
                        month: 1,
                        year: 1990,
                    },
                },
                tos_acceptance: {
                    date: moment().unix(),
                    ip: ip,
                },
                settings: {
                    payments: {
                        statement_descriptor: "Uphony App",
                    },
                    payouts: {
                        statement_descriptor: "Uphony App",
                    },
                },
                // capabilities: {
                //     card_payments: {
                //         requested: true,
                //     },
                //     transfers: {
                //         requested: true,
                //     },
                // },
            };
            const data = await sails.helpers.stripe.createAccount(
                accountCreationDetails
            );
            accountId = data?.status ? data?.id : null;
            await User.update({
                id: loginUserData?.id,
            }).set({
                accountId: accountId,
            });
        }
        return exits.success(accountId);
    },
};
