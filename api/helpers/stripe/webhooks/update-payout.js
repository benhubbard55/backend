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
            const artistId = parseFloat(payoutData?.metadata?.artistId);

            await TransactionHistory.updateOne({ id: transactionHistoryId }).set({
                status: "success",
            });

            const findArtist = await User.findOne({ id: artistId });

            if (findArtist) {
                const amount = findArtist.balance - (payoutData?.amount / 100);

                await User.updateOne({ id: artistId }).set({ balance: amount });
            }

            return exits.success(true);
        } catch (error) {
            return exits.success(false);
        }
    },
};
