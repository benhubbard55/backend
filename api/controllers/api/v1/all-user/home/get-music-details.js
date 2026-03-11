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
            const musicId = this.req.params["musicId"];

            const findMusic = await Music.findOne({
                id: musicId,
                isDeleted: false,
            }).populate("userId");

            if (!findMusic) {
                return exits.notFound({
                    status: false,
                    message: "Music not found",
                    data: {},
                });
            }

            // isLikedMusic
            const getIsLike = await sails.helpers.getIsLikedMusic.with({
                musicId: musicId,
                userId: loginUserData?.id,
            });
            findMusic.isLiked = getIsLike;

            //isDownloadedMusic
            const getIsDownloaded = await sails.helpers.getIsDownloadedMusic.with({
                musicId: musicId,
                userId: loginUserData?.id,
            });
            findMusic.isMusicDownloaded = getIsDownloaded;

            //isFollowedArtist
            const getIsFollowed = await sails.helpers.getIsFollowed.with({
                userId: loginUserData?.id,
                artistId: findMusic?.userId?.id,
            });
            findMusic.isArtistFollowed = getIsFollowed;

            const findChat = await ChatGroup.findOne({
                or: [
                    {
                        creatorId: loginUserData?.id,
                        userId: findMusic?.userId?.id,
                    },
                    {
                        creatorId: findMusic?.userId?.id,
                        userId: loginUserData?.id,
                    },
                ],
            });
            findMusic.chatGroupId = findChat?.id || null;

            return exits.success({
                status: true,
                message: "Music details fetched successfully",
                data: findMusic,
            });
        } catch (error) {
            return exits.invalid({
                status: false,
                message: serverErrorMsg,
                error: error,
            });
        }
    },
};
