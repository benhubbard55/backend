module.exports = {
    friendlyName: "Get chat list",
    description: "",
    inputs: {
        pageNo: {
            type: "number",
            required: true,
        },
        lastMessageId: {
            type: "number",
            required: false,
        },
        search: {
            type: "string",
            required: false,
        },
    },
    exits: {
        normalError: sails.config.globals.statusCodes.normalError,
        successWithEmpty: sails.config.globals.statusCodes.successWithEmpty,
    },

    fn: async function (inputs, exits) {
        try {
            var req = this.req;
            var RECORD_LIMIT_PER_PAGE =
                sails.config.globals.CONSTANTS.RECORD_LIMIT_PER_PAGE;
            var skip = (inputs.pageNo - 1) * RECORD_LIMIT_PER_PAGE;
            var limit = RECORD_LIMIT_PER_PAGE;

            var getChatListQueryValues = [
                sails.config.custom.imageRetrieveUrl,
                sails.config.custom.PATH.USER_IMAGE_PATH,
                req.loggedInUser.id,
                skip,
                limit,
            ];
            // IF(u.defaultImageUrl IS NOT NULL, CONCAT($1,$2,'/', u.id, '/', u.defaultImageUrl), NULL) AS opponentUserImage
            var getChatListQuery = `SELECT 
                u.name AS opponentUserName, 
                u.id AS opponentUserId, 
                u.id AS opponentUserSecretId, 
                0 AS unreadCount,
                c.*,
                u.isDeleted as isOpponentDeleted,
                u.isUserOnline,
                COALESCE(CONCAT("${sails.config.custom.baseUrl}","${sails.config.globals.imagePath.USER_PROFILE_DISPLAY_IMAGE_PATH}","/",u.profileImage),null) as userProfile
            FROM chatGroups AS cg
                INNER JOIN chats AS c ON c.id = cg.lastMsgId 
                INNER JOIN users AS u ON (cg.creatorId = u.id OR cg.userId = u.id) AND u.id <> $3 
                LEFT JOIN blockUser AS bu 
                    ON (bu.blockBy = $3 AND bu.blockTo = u.id) 
                    OR (bu.blockBy = u.id AND bu.blockTo = $3)
            WHERE 
                bu.blockBy IS NULL
                AND (
                    (
                        cg.creatorId = $3 AND 
                        (c.createdAt > cg.removeFromGroupTimeForCreatorSide OR cg.removeFromGroupTimeForCreatorSide IS NULL)
                    ) OR (
                        cg.userId = $3 AND 
                        (c.createdAt > cg.removeFromGroupTimeForUserSide OR cg.removeFromGroupTimeForUserSide IS NULL)
                    )
                )`;

            if (inputs.search) {
                getChatListQuery += `AND u.name LIKE "${inputs.search}%" `;
            }

            if (inputs.lastMessageId) {
                getChatListQuery += ` AND c.id > ${inputs.lastMessageId}`;
            }
            const sqlCountQuery = getChatListQuery;
            getChatListQuery += ` ORDER BY c.id DESC
            LIMIT $4, $5`;

            var getChatListData = await sails.sendNativeQuery(
                getChatListQuery,
                getChatListQueryValues
            );
            getChatListData = getChatListData.rows;

            if (!getChatListData.length) {
                return exits.successWithEmpty({
                    status: false,
                    message: "No records found",
                });
            }

            for (const item of getChatListData) {
                item.unreadCount = await GroupMessageStatus.count({
                    receiverId: req.loggedInUser.id,
                    groupId: item?.chatGroupId,
                    status: { in: ["sent", "deliver"] },
                });
            }
            // find count and add isNextPage
            let getChatListCount = await sails.sendNativeQuery(
                sqlCountQuery,
                getChatListQueryValues
            );
            getChatListCount = getChatListCount.rows.length;

            const totalPage = Math.ceil(getChatListCount / limit);
            const isNextPage = inputs.pageNo < totalPage;

            return exits.success({
                status: true,
                message: sails.__("Fetch data successfully"),
                isNextPage: isNextPage,
                data: getChatListData,
            });
        } catch (error) {
            return exits.normalError({
                status: false,
                error: error,
                message: "Something went wrong",
            });
        }
    },
};
