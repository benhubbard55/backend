module.exports = {
    inputs: {},
    exits: {
        success: sails.config.globals.statusCodes.success,
    },
    fn: async function (inputs, exits) {
        const loginUserData = this.req.loggedInUser;

        const result = await sails.helpers.getPaginationList.with({
            request: this.req,
            modelName: "TransactionHistory",
            whereCondition: { userId: loginUserData.id, transferType: "buyMusic", status: "success" },
            sortBy: "id desc",
            populate: ["musicId", "receiverId"],
        });

        for (let i = 0; i < result?.data?.length; i++) {
            const buyMusicData = result?.data[i];
            //isDownloadedMusic
            const getIsDownloaded = await sails.helpers.getIsDownloadedMusic.with({
                musicId: buyMusicData?.musicId?.id,
                userId: loginUserData?.id,
            });
            buyMusicData.musicId.isMusicDownloaded = getIsDownloaded;
        }

        return exits.success(result);
    },
};
