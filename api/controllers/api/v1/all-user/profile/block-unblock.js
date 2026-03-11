module.exports = {
    friendlyName: "Block-unblock",
    inputs: {
        blockTo: {
            type: "number",
            required: true,
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
            const { blockTo } = inputs;

            const targetUser = await User.findOne({
                id: inputs.blockTo,
                isDeleted: false,
            });

            if (!targetUser) {
                return exits.notFound({
                    status: false,
                    message: "User not found",
                });
            }

            let responseMessage;

            const findBlockUser = await BlockUser.findOne({ blockBy: loginUserData.id, blockTo: blockTo });

            if (findBlockUser) {
                await BlockUser.destroy({ id: findBlockUser?.id });

                responseMessage = {
                    status: true,
                    message: "User unblocked successfully",
                };
            } else {
                await BlockUser.create({
                    blockBy: loginUserData?.id,
                    blockTo: blockTo,
                });

                const deletedFollows = await Follower.destroy({
                    or: [
                        { followedBy: loginUserData.id, followedTo: blockTo },
                        { followedBy: blockTo, followedTo: loginUserData.id },
                    ],
                }).fetch();

                if (deletedFollows.length > 0) {
                    const loginUpdates = {};
                    const targetUpdates = {};

                    if (deletedFollows.some(f => f.followedBy === loginUserData.id && f.followedTo === blockTo)) {
                        loginUpdates.followingCount = Math.max(loginUserData.followingCount - 1, 0);
                        targetUpdates.followCount = Math.max(targetUser.followCount - 1, 0);
                    }

                    if (deletedFollows.some(f => f.followedBy === blockTo && f.followedTo === loginUserData.id)) {
                        loginUpdates.followCount = Math.max(loginUserData.followCount - 1, 0);
                        targetUpdates.followingCount = Math.max(targetUser.followingCount - 1, 0);
                    }

                    if (Object.keys(loginUpdates).length > 0) {
                        await User.updateOne({ id: loginUserData.id }).set(loginUpdates);
                    }

                    if (Object.keys(targetUpdates).length > 0) {
                        await User.updateOne({ id: blockTo }).set(targetUpdates);
                    }
                }

                responseMessage = {
                    status: true,
                    message: "User blocked successfully",
                };
            }
            return exits.success(responseMessage);
        } catch (error) {
            return exits.invalid({
                status: false,
                message: serverErrorMsg,
            });
        }
    },
};
