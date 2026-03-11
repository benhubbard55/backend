module.exports = {
    inputs: {
        artistId: {
            type: "number",
            required: true,
        },
        musicId: {
            type: "number",
            required: true,
        },
        isNext: {
            type: "boolean",
            required: true,
        },
        isPrevious: {
            type: "boolean",
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
            const { artistId, musicId, isNext, isPrevious } = inputs;
            if (isNext == isPrevious) {
                return exits.badRequest({
                    status: false,
                    message: "Please select any one operation either next or previous",
                });
            }

            const orderByString = isNext
                ? "id ASC"
                : isPrevious
                    ? "id DESC"
                    : "id ASC";
            const conditionObject = isNext
                ? {
                    id: { ">": musicId },
                    userId: artistId,
                    // isDeleted: false,
                }
                : {
                    id: { "<": musicId },
                    userId: artistId,
                    // isDeleted: false,
                };
            const [findMusic] = await Music.find(conditionObject)
                .sort(orderByString)
                .limit(1);
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
                artistId: findMusic?.userId,
            });
            findMusic.isArtistFollowed = getIsFollowed;

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
