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
        }
    },
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
        notFound: sails.config.globals.statusCodes.notFound,
    },
    fn: async function (inputs, exits) {
        try {
            const loginUserData = this.req.loggedInUser;
            let { page, limit } = inputs;
            const skip = (page - 1) * limit;

            const musicFileBaseUrl = sails.config.custom.baseUrl +
                sails.config.globals.imagePath.MUSIC_FILE_DISPLAY_IMAGE_PATH + "/";
            const musicImageUrl = sails.config.custom.baseUrl +
                sails.config.globals.imagePath.MUSIC_PROFILE_DISPLAY_IMAGE_PATH + "/";

            let sql = `
                SELECT m.*, 
                    u.name as artistName,
                    u.profileImage,
                    mt.genreName as genreName,
                    CONCAT('${musicImageUrl}', IFNULL(m.profileImage, '')) as profileImage,
                    CONCAT('${musicFileBaseUrl}', IFNULL(m.musicFileName, '')) as musicFileName
                FROM music m
                INNER JOIN users u ON m.userId = u.id
                LEFT JOIN musicType mt ON m.musicTypeId = mt.id
                WHERE m.isDeleted = 0 
                AND u.isActive = 1 
                AND m.userId != ${loginUserData?.id}
                AND NOT EXISTS (
                    SELECT 1 FROM blockUser b 
                    WHERE (b.blockTo = u.id AND b.blockBy = ${loginUserData?.id})
                    OR (b.blockBy = u.id AND b.blockTo = ${loginUserData?.id})
                )
                ORDER BY m.createdAt DESC
                LIMIT ${limit} OFFSET ${skip}
            `;

            const records = await sails.sendNativeQuery(sql);

            if (!records.rows || records.rows.length === 0) {
                return exits.notFound({
                    status: false,
                    message: "No music found",
                });
            }

            const isNextPage = records.rows.length === limit;

            return exits.success({
                status: true,
                message: "List fetched successfully",
                data: records.rows,
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
