module.exports = {
    inputs: {
        paymentIntentData: {
            type: "ref",
            required: true,
        },
    },

    exits: {
        success: {},
    },

    fn: async function (inputs, exits) {
        const { paymentIntentData } = inputs;
        const {
            userId,
            artistId,
            musicId,
            id: buyMusicId,
        } = await BuyMusic.findOne({
            id: paymentIntentData?.metadata?.buyMusicId,
        }).populateAll();

        const amount = parseFloat(paymentIntentData?.metadata?.amount);
        const tax = parseFloat(paymentIntentData?.metadata?.tax);
        const totalAmount = parseFloat(paymentIntentData?.metadata?.totalAmount);
        const commissionPercentage = parseFloat(
            paymentIntentData?.metadata?.commissionPercentage
        );
        const totalArtistAmount = parseFloat(
            paymentIntentData?.metadata?.totalArtistAmount
        );

        // store payment details after capture
        const createObj = [
            {
                // user perspective
                userId: userId.id,
                buyMusicId: buyMusicId,
                amount: amount,
                type: "credit",
                tax: tax,
                transferType: "buyMusic",
                transactionId: paymentIntentData?.id,
                totalAmount: totalAmount,
                receiverId: artistId?.id,
                musicId: musicId?.id,
                status: "success",
            },
            {
                // artist perspective
                userId: userId?.id,
                buyMusicId: buyMusicId,
                amount: amount,
                type: "credit",
                transferType: "sellMusic",
                tax: commissionPercentage,
                transactionId: paymentIntentData?.id,
                totalAmount: totalArtistAmount,
                receiverId: artistId?.id,
                musicId: musicId?.id,
                status: "success",
            },
        ];
        await TransactionHistory.createEach(createObj);

        await BuyMusic.updateOne({ id: buyMusicId }).set({
            status: "completed",
        });

        await User.updateOne({
            id: artistId?.id,
        }).set({
            balance: artistId?.balance + totalArtistAmount,
        });

        await Music.updateOne({
            id: musicId?.id,
        }).set({
            purchaseCount: musicId?.purchaseCount + 1,
        });

        //Send Notification for artist
        await sails.helpers.addNotification.with({
            senderId: userId.id,
            receiverId: artistId?.id,
            notificationType: "buyMusic",
            redirectId: musicId?.id,
            title: "Purchase Music",
            description: `${userId?.name} purchase your music ${musicId?.title}`,
        });

        return exits.success(true);
    },
};
