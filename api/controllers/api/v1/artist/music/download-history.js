module.exports = {
    inputs: {
        page: {
            type: "number",
            min: 1,
            defaultsTo: 1,
        },
        limit: {
            type: "number",
            min: 1,
            defaultsTo: 10,
        },
    },
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
    },
    fn: async function (inputs, exits) {

        const loginUserData = this.req.loggedInUser;
        const musicId = this.req.params["musicId"];

        const result = await sails.helpers.getPaginationList.with({
            request: this.req,
            modelName: "MusicDownloadHistory",
            whereCondition: { musicId: musicId },
            populate: ["userId"],
            sortBy: "id desc",
        });

        for (let index = 0; index < result?.data.length; index++) {
            const buyMusicData = result?.data[index];
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

        if (result) {
            return exits.success(result);
        } else {
            return exits.invalid(result);
        }
    },
};
