module.exports = {
    friendlyName: "Send OTP",
    description: "",
    inputs: {

    },
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
        notFound: sails.config.globals.statusCodes.notFound,
        conflict: sails.config.globals.statusCodes.conflict,
    },
    fn: async function (inputs, exits) {
        const stripe = require('stripe')(process.env.STRIPE_API_TEST_KEY); // or your secret key directly

        try {
            // 1. Create bank account token
            const bankToken = await stripe.tokens.create({
                bank_account: {
                    country: 'US',
                    currency: 'usd',
                    account_holder_name: 'Keval Keval',
                    account_holder_type: 'individual',
                    routing_number: '110000000',
                    account_number: '000123456789',
                },
            });

            // 2. Create Custom Connect Account
            const accountCreationDetails = {
                type: 'custom',
                country: 'US',
                business_type: 'individual',
                individual: {
                    first_name: 'Keval',
                    last_name: 'Keval',
                    email: 'logistickeval5155@gmail.com',
                    phone: '+14155552671',
                    dob: { day: 1, month: 1, year: 1990 },
                    address: {
                        line1: '123 Main St',
                        city: 'San Francisco',
                        state: 'CA',
                        postal_code: '94111',
                        country: 'US'
                    }
                },
                external_account: bankToken.id,
                requested_capabilities: ['transfers'],
                business_profile: {
                    product_description: 'Uphony connect account for payout'
                },
                tos_acceptance: {
                    date: Math.floor(Date.now() / 1000),
                    ip: '192.168.0.0'
                },
                settings: {
                    payments: {
                        statement_descriptor: 'Uphony App'
                    },
                    payouts: {
                        statement_descriptor: 'Uphony App'
                    }
                }
            }
            const data = await sails.helpers.stripe.createAccount(
                accountCreationDetails
            );
            return exits.success({
                status: true,
                account: data,
                message: "OTP has been sent to your email",
            });

        } catch (err) {
            sails.log.error('Stripe error:', err);
            return exits.invalid({
                status: false,
                message: serverErrorMsg,
            });
        }
    },
};
