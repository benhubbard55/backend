module.exports = {
    inputs: {
        musicId: {
            type: "number",
            required: true,
        },
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

            const findMusic = await Music.findOne({ id: musicId, isDeleted: false, });

            if (!findMusic) {
                return exits.notFound({
                    success: false,
                    message: "Music not found",
                });
            }

            const findBuyMusic = await BuyMusic.findOne({
                musicId: musicId,
                userId: loginUserData?.id,
            });

            const createOrUpdateObj = {
                artistId: findMusic?.userId,
                musicId: musicId,
                userId: loginUserData?.id,
            };

            if (findBuyMusic) {
                await BuyMusic.updateOne({
                    id: findBuyMusic?.id,
                }).set(createOrUpdateObj);
            } else {
                await BuyMusic.create(createOrUpdateObj);
            }

            await sails.helpers.addNotification.with({
                senderId: loginUserData?.id,
                receiverId: findMusic?.userId,
                notificationType: "buyMusic",
                redirectId: findMusic?.id,
                title: "Music Purchase",
                description: `${loginUserData?.name} is purchase ${findMusic?.title} music`,
            });

            return exits.success({
                status: true,
                message: "Music purchased successfully",
            });
        } catch (error) {
            return exits.invalid({
                status: false,
                message: serverErrorMsg,
            });
        }
    },
};
