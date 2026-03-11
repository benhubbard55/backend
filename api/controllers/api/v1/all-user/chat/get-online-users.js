module.exports = {
    friendlyName: 'Get online users',
    description: '',
    inputs: {
        pageNo: {
            type: 'number',
            required: true
        },
    },
    exits: {
        normalError: sails.config.globals.statusCodes.normalError,
        successWithEmpty: sails.config.globals.statusCodes.successWithEmpty,
    },

    fn: async function (inputs, exits) {
        try {

            var req = this.req;
            var RECORD_LIMIT_PER_PAGE = sails.config.globals.CONSTANTS.RECORD_LIMIT_PER_PAGE;
            var skip = (inputs.pageNo - 1) * RECORD_LIMIT_PER_PAGE;
            var limit = RECORD_LIMIT_PER_PAGE;

            var getChatListQueryValues = [sails.config.custom.imageRetrieveUrl, sails.config.custom.PATH.USER_IMAGE_PATH, req.loggedInUser.id, skip, limit];
            var getChatListQuery = `SELECT 
                u.name AS opponentUserName, 
                u.id AS opponentUserId, 
                u.id AS opponentUserSecretId, 
                COALESCE(CONCAT("${sails.config.custom.baseUrl}","${sails.config.globals.imagePath.USER_PROFILE_DISPLAY_IMAGE_PATH}","/",u.profileImage),null) as userProfile
            FROM chatGroups AS cg
                INNER JOIN chats AS c ON c.id = cg.lastMsgId 
                INNER JOIN users AS u ON (c.receiverId = u.id OR c.senderId = u.id) AND u.id <> $3 
            WHERE 
                (cg.creatorId = $3 OR cg.userId = $3) AND u.isUserOnline = true 
                LIMIT $4, $5`;

            var getChatListData = await sails.sendNativeQuery(getChatListQuery, getChatListQueryValues);
            getChatListData = getChatListData.rows;

            if (!getChatListData.length) {
                return exits.successWithEmpty({
                    status: false,
                    message: 'No records found'
                });
            }

            return exits.success({
                status: true,
                message: sails.__('Fetch data successfully'),
                data: getChatListData
            })
        } catch (error) {
            return exits.normalError({
                status: false,
                error: error,
                message: 'Something went wrong'
            });
        }
    }
};
