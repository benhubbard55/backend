module.exports = {
    inputs: {},
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
        notFound: sails.config.globals.statusCodes.notFound,
    },
    fn: async function (inputs, exits) {
        try {
            const loginUserData = this.req.loggedInUser;
            const randomSort = await sails.helpers.generateRandomOrder();
            const findUserList = await User.find({
                where: { isDeleted: false, isVerified: true, isActive: true },
                sort: randomSort,
            });

            const userIds = _.map(findUserList, "id");
            const blockedUsers = await BlockUser.find({
                or: [{ blockBy: loginUserData?.id }, { blockTo: loginUserData?.id }],
            });

            const blockedUserIds = _.uniq(
                blockedUsers.flatMap((block) => [block.blockBy, block.blockTo])
            );

            const result = await sails.helpers.getPaginationList.with({
                request: this.req,
                modelName: "Music",
                whereCondition: {
                    isDeleted: false,
                    userId: { nin: [loginUserData?.id, ...blockedUserIds], in: userIds },
                },
                sortBy: randomSort,
                populate: ["userId"],
            });

            for (let i = 0; i < result.data.length; i++) {
                const musicData = result.data[i];
                // isLikedMusic
                const getIsLike = await sails.helpers.getIsLikedMusic.with({
                    musicId: musicData?.id,
                    userId: loginUserData?.id,
                });
                musicData.isLiked = getIsLike;

                //isDownloadedMusic
                const getIsDownloaded = await sails.helpers.getIsDownloadedMusic.with({
                    musicId: musicData?.id,
                    userId: loginUserData?.id,
                });
                musicData.isMusicDownloaded = getIsDownloaded;

                //isFollowedArtist
                const getIsFollowed = await sails.helpers.getIsFollowed.with({
                    userId: loginUserData?.id,
                    artistId: musicData?.userId?.id,
                });
                musicData.isArtistFollowed = getIsFollowed;
            }

            return exits.success(result);
        } catch (error) {
            return exits.invalid({
                status: false,
                message: serverErrorMsg,
                error: error,
            });
        }
    },
};
