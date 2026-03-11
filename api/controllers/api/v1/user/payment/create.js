module.exports = {
    friendlyName: "Follower list",
    inputs: {
        musicId: {
            type: "number",
            required: true,
        },
        // sourceId: {
        //     type: "string",
        //     required: true,
        // },
        // amount: {
        //     type: "number",
        //     required: true,
        // },
    },
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
        notFound: sails.config.globals.statusCodes.notFound,
        badRequest: sails.config.globals.statusCodes.badRequest,
    },
    fn: async function (inputs, exits) {
        try {
            const loginUserData = this.req.loggedInUser;
            const { musicId } = inputs;

            const findMusic = await Music.findOne({
                id: musicId,
                isDeleted: false,
            }).populate("userId");

            if (!findMusic) {
                return exits.notFound({
                    status: false,
                    message: "Music not found",
                });
            }
            const amount = findMusic?.amount;
            const artistId = findMusic?.userId?.id;

            const [findCommission, findText] = await PaymentSetting.find({});

            // calculate tax
            const tax = (amount * findText.tax) / 100;
            const totalAmount = amount + tax;

            // calculate commission
            const commissionPercentage = (amount * findCommission.tax) / 100
            const totalArtistAmount = amount - commissionPercentage
            // create customer if not exist
            let customerId = await sails.helpers.createCustomerIfNotExist(
                loginUserData
            );

            if (!customerId) {
                return exits.badRequest({
                    status: false,
                    message: "Payment failed, with customer issue",
                });
            }

            const createBuyMusic = await BuyMusic.create({
                userId: loginUserData.id,
                musicId: musicId,
                artistId: artistId,
                status: "pending",
            }).fetch();

            // create payment intent
            const createPaymentData =
                await sails.helpers.stripe.createPaymentIntent.with({
                    amount: totalAmount,
                    customerId: customerId,
                    // cardId: sourceId,
                    metaData: {
                        buyMusicId: createBuyMusic?.id,
                        amount: amount,
                        totalAmount: totalAmount,
                        tax: tax,
                        commissionPercentage: commissionPercentage,
                        totalArtistAmount: totalArtistAmount
                    },
                });

            if (!createPaymentData.status) {
                await BuyMusic.updateOne({
                    id: createBuyMusic?.id,
                }).set({
                    status: "failed",
                });
                return exits.invalid({
                    status: false,
                    message: "Payment failed",
                });
            }

            // // capture payment intent
            // const captureData = await sails.helpers.stripe.capturePaymentIntent.with({
            //     paymentIntentId: createPaymentData?.id,
            // });

            return exits.success({
                status: true,
                message: "Payment done successfully",
                clientSecrete: createPaymentData?.client_secret,
            });
        } catch (error) {
            console.log("error", error);
            return exits.invalid({
                status: false,
                message: serverErrorMsg,
                error: error,
            });
        }
    },
};
