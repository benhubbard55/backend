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
        filter: {
            type: "string",
            isIn: ["all", "lowToHigh", "highToLow", "newest", "mostLiked"],
            defaultsTo: "all",
        },
        search: {
            type: "string",
        },
    },
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
        notFound: sails.config.globals.statusCodes.notFound,
    },
    fn: async function (inputs, exits) {
        try {
            const loginUserData = this.req.loggedInUser;

            let { page, limit, search, filter } = inputs;
            const skip = (page - 1) * limit;
            const artistId = this.req.params["artistId"];

            const findArtist = await User.findOne({
                id: artistId,
                isDeleted: false
            });

            if (!findArtist) {
                return exits.notFound({
                    status: false,
                    message: "Artist not found",
                });
            }

            let sql = `SELECT * FROM music as m WHERE m.userId=${artistId} AND m.isDeleted = 0 `;

            if (search) {
                sql += ` AND m.title LIKE "${search}%" `;
            }

            const randomSort = await sails.helpers.generateRandomOrder();
            const filterOption = [
                "all",
                "lowToHigh",
                "highToLow",
                "newest",
                "mostLiked",
            ];
            const filterObj = {
                all: randomSort,
                lowToHigh: "amount asc",
                highToLow: "amount DESC",
                newest: "createdAt DESC",
                mostLiked: "likeCount DESC",
            };
            if (filterOption.includes(filter)) {
                sql += ` ORDER BY ${filterObj[filter]}`;
            }

            const sqlWithLimit = sql + ` LIMIT ${limit} OFFSET ${skip};`;
            let records = await sails.sendNativeQuery(sqlWithLimit);
            records = records?.rows;

            // add isLiked flag
            for (let i = 0; i < records.length; i++) {
                const musicData = records[i];
                const getIsLike = await sails.helpers.getIsLikedMusic.with({
                    musicId: musicData?.id,
                    userId: loginUserData?.id,
                });
                //isDownloadedMusic
                const getIsDownloaded = await sails.helpers.getIsDownloadedMusic.with({
                    musicId: musicData?.id,
                    userId: loginUserData?.id,
                });
                musicData.isMusicDownloaded = getIsDownloaded;
                musicData.isLiked = getIsLike;
                if (musicData.musicFileName) {
                    musicData.musicFileName =
                        sails.config.custom.baseUrl +
                        sails.config.globals.imagePath.MUSIC_FILE_DISPLAY_IMAGE_PATH +
                        "/" +
                        musicData.musicFileName;
                }
                if (musicData.profileImage) {
                    musicData.profileImage =
                        sails.config.custom.baseUrl +
                        sails.config.globals.imagePath.MUSIC_PROFILE_DISPLAY_IMAGE_PATH +
                        "/" +
                        musicData.profileImage;
                }
            }

            const isNextPage = records.length === limit;

            return exits.success({
                status: true,
                message: "List fetched successfully",
                data: records,
                pagination: {
                    isNextPage: isNextPage,
                },
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
