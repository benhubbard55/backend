module.exports = {
    inputs: {
        payoutData: {
            type: "ref",
            required: true,
        },
    },

    exits: {},

    fn: async function (inputs, exits) {
        try {
            const { payoutData } = inputs;

            const transactionHistoryId = parseFloat(
                payoutData?.metadata?.transactionHistoryId
            );

            await TransactionHistory.updateOne({ id: transactionHistoryId }).set({
                status: "failed",
            });

            return exits.success(true);
        } catch (error) {
            return exits.success(false);
        }
    },
};
