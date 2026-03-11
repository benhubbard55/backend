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
            isIn: ["all", "newest", "followsArtist", "popularity"],
            defaultsTo: "all",
        },
        search: {
            type: "string",
        },
        genreId: {
            type: "string",
        },
    },
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
    },
    fn: async function (inputs, exits) {
        try {
            const loginUserData = this.req.loggedInUser;

            const page = inputs.page;
            const limit = inputs.limit;

            const skip = (page - 1) * limit;

            if (inputs.filter == "followsArtist") {
                var findUserList = await Follower.find({
                    followedBy: loginUserData?.id,
                });
            }

            const imageBaseUrl =
                sails.config.custom.baseUrl +
                sails.config.globals.imagePath.USER_PROFILE_DISPLAY_IMAGE_PATH +
                "/";

            // let sql = `SELECT u.*, CONCAT("${imageBaseUrl}",u.profileImage) as profileImage FROM users as u
            //              INNER JOIN music as m
            //              on u.id=m.userId 
            //              where u.isDeleted = 0 AND m.userId != ${loginUserData?.id} ${inputs.genreId
            //         ? ` AND m.musicTypeId=${inputs.genreId} AND m.isDeleted = 0 `
            //         : ""
            //     } ${inputs.filter == "followsArtist"
            //         ? ` AND u.id IN ("${findUserList
            //             .map((data) => data?.followedTo)
            //             .join(",")}") `
            //         : ""
            //     } ${inputs.search ? ` AND u.name LIKE "${inputs.search}%"` : ""}
            //     GROUP BY m.userId `;

            let sql = `SELECT u.*, CONCAT("${imageBaseUrl}",u.profileImage) as profileImage FROM users as u
                INNER JOIN music as m
                ON u.id = m.userId
                LEFT JOIN blockUser as b
                ON (u.id = b.blockTo AND b.blockBy = ${loginUserData?.id}) 
                OR (u.id = b.blockBy AND b.blockTo = ${loginUserData?.id}) 
                WHERE u.isDeleted = 0 
                AND m.userId != ${loginUserData?.id}
                AND b.blockBy IS NULL
                ${inputs.genreId ? ` AND m.musicTypeId=${inputs.genreId} AND m.isDeleted = 0` : ""}
                ${inputs.filter == "followsArtist"
                    ? ` AND u.id IN ("${findUserList
                        .map((data) => data?.followedTo)
                        .join(",")}")`
                    : ""}
                ${inputs.search ? ` AND u.name LIKE "${inputs.search}%"` : ""}
                GROUP BY m.userId`;

            const filterOption = ["newest", "popularity"];
            const filterObj = {
                newest: "u.id DESC",
                popularity: "u.followCount DESC",
            };
            if (filterOption.includes(inputs.filter)) {
                sql += ` ORDER BY ${filterObj[inputs.filter]}`;
            }

            const sqlWithLimit = sql + ` LIMIT ${limit} OFFSET ${skip};`;

            let records = await sails.sendNativeQuery(sqlWithLimit);
            records = records?.rows;

            let finalRecords = [];
            if (records.length > 0) {
                const randomSort = await sails.helpers.generateRandomOrder();
                for (let i = 0; i < records?.length; i++) {
                    const artist = records[i];

                    const findMusic = await Music.find({
                        userId: artist?.id,
                        isDeleted: false
                    }).sort(randomSort)
                        .limit(3)
                        .populate("musicTypeId");
                    if (findMusic.length === 0) {
                        continue;
                    }

                    for (let j = 0; j < findMusic.length; j++) {
                        const musicData = findMusic[j];

                        //isDownloadedMusic
                        const getIsDownloaded =
                            await sails.helpers.getIsDownloadedMusic.with({
                                musicId: musicData?.id,
                                userId: loginUserData?.id,
                            });
                        musicData.isMusicDownloaded = getIsDownloaded;
                    }
                    artist.musicList = findMusic || [];
                    finalRecords.push(artist);
                }
            }

            let sqlCount = sql;
            // const totalCountRecords = await sails.sendNativeQuery(sqlCount);
            // const totalRecords = totalCountRecords.rows.length;
            // const totalPages = Math.ceil(totalRecords / limit);

            const isNextPage = records.length === limit;

            return exits.success({
                status: true,
                message: "List fetched successfully",
                data: finalRecords,
                pagination: {
                    // totalRecord: totalRecords,
                    // currentPage: page,
                    // totalPage: totalPages,
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
