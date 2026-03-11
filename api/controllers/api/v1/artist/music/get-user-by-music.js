module.exports = {
    friendlyName: "Get Music",
    inputs: {},
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
        notFound: sails.config.globals.statusCodes.notFound,
    },
    fn: async function (inputs, exits) {
        try {
            const loginUserData = this.req.loggedInUser;

            const musicId = this.req.params["musicId"];

            const findMusic = await Music.findOne({
                id: musicId,
                isDeleted: false,
            });

            if (!findMusic) {
                return exits.notFound({
                    success: false,
                    message: "Music not found",
                });
            }

            const data = await sails.helpers.getPaginationList.with({
                request: this.req,
                modelName: "BuyMusic",
                whereCondition: { artistId: loginUserData?.id, musicId: musicId },
                populate: ["userId"],
            });

            for (let index = 0; index < data?.data.length; index++) {
                const buyMusicData = data?.data[index];
                const findChat = await ChatGroup.findOne({
                    or: [
                        {
                            creatorId: loginUserData?.id,
                            userId: buyMusicData?.userId?.id,
                        },
                        {
                            creatorId: buyMusicData?.userId?.id,
                            userId: loginUserData?.id,
                        },
                    ],
                });
                buyMusicData.chatGroupId = findChat?.id || null;
            }
            if (!data?.status) {
                throw "error";
            }
            return exits.success(data);
        } catch (error) {
            return exits.invalid({
                status: false,
                message: serverErrorMsg,
                error: error,
            });
        }
    },
};
