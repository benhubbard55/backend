module.exports = {
    inputs: {
        userId: {
            type: "number",
            required: true,
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

            const userRecord = await User.findOne({
                id: inputs.userId,
                isDeleted: false,
            });
            if (!userRecord) {
                return exits.notFound({
                    status: false,
                    message: "User not found",
                });
            }
            const getIsFollowed = await sails.helpers.getIsFollowed.with({
                userId: loginUserData?.id,
                artistId: inputs.userId,
            });
            userRecord.isArtistFollowed = getIsFollowed;

            // if (inputs.userId === loginUserData.id) {
            //     const blockbyUser = await BlockUser.find({
            //         blockBy: loginUserData.id,
            //         blockTo: inputs.userId,
            //     });

            //     const blockToUser = await BlockUser.find({
            //         blockTo: loginUserData.id,
            //         blockBy: inputs.userId,
            //     });
            //     userRecord.blockedByUser = blockbyUser.length > 0 ? true : false;
            //     userRecord.blockedByMe = blockToUser.length > 0 ? true : false;
            // }
            return exits.success({
                status: true,
                message: "Details get successfully",
                data: userRecord,
            });
        } catch (error) {
            return exits.invalid({
                status: false,
                message: serverErrorMsg,
            });
        }
    },
};
