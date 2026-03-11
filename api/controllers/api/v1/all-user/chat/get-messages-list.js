module.exports = {
    friendlyName: "Get chat list",
    description: "",
    inputs: {
        receiverId: {
            type: "number",
            required: true,
        },
        pageNo: {
            type: "number",
            required: true,
        },
        lastMessageId: {
            type: "number",
            required: false,
        },
        chatGroupId: {
            type: "number",
            required: true,
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

            var isUserExist = await User.findOne({
                id: inputs.receiverId,
            });
            if (!isUserExist || isUserExist?.id == req.loggedInUser.id) {
                return exits.normalError({
                    status: false,
                    message: sails.__("Invalid receiver"),
                });
            }

            const findChatGroup = await ChatGroup.findOne({
                id: inputs.chatGroupId,
            });

            var getChatListQueryValue = [
                sails.config.custom.imageRetrieveUrl,
                sails.config.custom.PATH.USER_IMAGE_PATH,
                sails.config.custom.PATH.USER_CHAT_MEDIA_PATH,
                sails.config.custom.PATH.USER_CHAT_MEDIA_PATH,
                req.loggedInUser.id,
                skip,
                limit,
                isUserExist.id,
            ];
            // IF(${req.loggedInUser.id} = c.senderId, "${req.loggedInUser.defaultImageUrl ? (sails.config.custom.imageRetrieveUrl + sails.config.custom.PATH.USER_IMAGE_PATH + '/' + req.loggedInUser.id + '/' + req.loggedInUser.defaultImageUrl) : NULL}", IF(u.defaultImageUrl IS NOT NULL, CONCAT($1,$2,'/', u.id, '/', u.defaultImageUrl), NULL)) AS senderImage,
            // IF(${req.loggedInUser.id} = c.senderId, "${req.loggedInUser.name}", u.name) AS senderName,
            var getChatListQuery = `SELECT  
            DISTINCT c.id, c.*,
            CASE
            WHEN isDeleted = false AND ${req.loggedInUser.id} = c.senderId THEN u.name
            ELSE 'Uphony user'
            END AS senderName,
            u.isDeleted AS isSenderDeleted,
            IF(${req.loggedInUser.id} = c.senderId, "${req.loggedInUser.name}", u.id) AS senderSecretId,
            IF(${req.loggedInUser.id} = c.senderId, COALESCE(CONCAT("${sails.config.custom.baseUrl}", "${sails.config.globals.imagePath.USER_PROFILE_DISPLAY_IMAGE_PATH}", u.profileImage), null), null) AS senderProfileImage,

            IF(${req.loggedInUser.id} = c.receiverId, "${req.loggedInUser.name}", u.name) AS receiverName,
            IF(${req.loggedInUser.id} = c.receiverId, "${req.loggedInUser.name}", u.id) AS receiverSecretId,
            IF(${req.loggedInUser.id} = c.receiverId, COALESCE(CONCAT("${sails.config.custom.baseUrl}", "${sails.config.globals.imagePath.USER_PROFILE_DISPLAY_IMAGE_PATH}", u.profileImage), null), null) AS receiverProfileImage,

            IF(c.messageMediaType = 'image' AND c.messageData IS NOT NULL, CONCAT('http://localhost/uploads/', "chat", '/image/', c.senderId, '/', c.messageData), null) AS imageMediaUrl,
            IF(c.messageMediaType = 'video' AND c.messageData IS NOT NULL, CONCAT('http://localhost/uploads/', "chat", '/video/', c.senderId, '/', c.messageData), null) AS videoMediaUrl,
            IF(c.messageMediaType = 'video' AND c.vedioThumbnail IS NOT NULL, CONCAT('http://localhost/uploads/', "chat", '/vedioThumbnail/', c.senderId, '/', c.vedioThumbnail), null) AS vedioThumbnailUrl,
            IF(c.messageMediaType = 'audio' AND c.messageData IS NOT NULL, CONCAT('http://localhost/uploads/', "chat", '/audio/', c.senderId, '/', c.messageData), null) AS audioUrl

            FROM chats AS c
                INNER JOIN users AS u ON (c.senderId = u.id AND c.receiverId = $5) OR (c.receiverId = u.id AND c.senderId = $5)
                LEFT JOIN chatGroups AS cg ON cg.id= c.chatGroupId
            WHERE 
                ((c.senderId=$5 AND c.receiverId=$8) OR (c.senderId=$8 AND c.receiverId=$5)) `;

            if (
                findChatGroup?.removeFromGroupTimeForCreatorSide &&
                findChatGroup?.isDeletedFromCreatorSide &&
                findChatGroup?.creatorId == req.loggedInUser.id
            ) {
                getChatListQuery += ` AND c.createdAt > cg.removeFromGroupTimeForCreatorSide  `;
            }

            if (
                findChatGroup?.removeFromGroupTimeForUserSide &&
                findChatGroup?.isDeletedFromUserSide &&
                findChatGroup?.userId == req.loggedInUser.id
            ) {
                getChatListQuery += ` AND c.createdAt > cg.removeFromGroupTimeForUserSide  `;
            }

            if (inputs.lastMessageId) {
                getChatListQuery += ` AND c.id > ${inputs.lastMessageId}`;
            }
            const sqlCountQuery = getChatListQuery;

            getChatListQuery += ` ORDER BY c.id DESC
            LIMIT $6, $7`;

            var getChatListData = await sails.sendNativeQuery(
                getChatListQuery,
                getChatListQueryValue
            );
            getChatListData = getChatListData.rows;

            if (!getChatListData.length) {
                return exits.successWithEmpty({
                    status: false,
                    message: "No records found",
                });
            }

            // find count and add isNextPage flag
            let getChatListCount = await sails.sendNativeQuery(
                sqlCountQuery,
                getChatListQueryValue
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
                message: "Something went wrong",
                error: error,
            });
        }
    },
};
