module.exports = {
    friendlyName: "WebHooks",
    description: "",
    inputs: {
        email: {
            type: "string",
        },
    },
    exits: {},

    fn: async function (inputs, exits) {
        try {
            const event = this.req.body;

            // Handle the event
            const paymentData = event.data.object;
            switch (event.type) {
                // ================================ Payment ================================
                case "payment_intent.succeeded":
                    await sails.helpers.stripe.webhooks.updatePayment.with({
                        paymentIntentData: paymentData,
                    });
                    break;
                case "payment_intent.payment_failed":
                    await sails.helpers.stripe.webhooks.failedPayment.with({
                        paymentIntentData: paymentData,
                    });
                    break;
                // ================================ Payment ================================

                // ================================ Payout ================================
                case "payout.paid":
                    await sails.helpers.stripe.webhooks.updatePayout.with({
                        payoutData: paymentData,
                    });
                    break;
                case "payout.failed":
                    await sails.helpers.stripe.webhooks.failedPayout.with({
                        payoutData: paymentData,
                    });
                    break;
                // ================================ Payout ================================
                default:
                    console.log(`Unhandled event type ${event.type}`);
            }

            return exits.success(true);
        } catch (error) {
            console.log("error :>> ", error);
            return exits.success(false);
        }
    },
};
