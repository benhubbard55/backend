module.exports = {
    friendlyName: 'Create comment',
    description: '',
    inputs: {
        commentId: {
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
            if (!inputs.commentId) {
                return exits.normalError({
                    message: 'Comment ID is required',
                    status: false
                });
            }
            const comment = await Comment.findOne({ id: inputs.commentId });
            if (!comment) {
                return exits.invalid({
                    message: 'comment not found',
                    status: false
                });
            }

            const MusicData = await Music.findOne({ id: comment.musicId });
            if (!MusicData) {
                return exits.invalid({
                    message: 'Music not found',
                    status: false
                });
            }

            if (comment.commentBy !== loginUserData?.id) {
                return exits.invalid({
                    message: 'You are not authorized to delete this comment',
                    status: false
                });
            }

            await Comment.destroy({ id: inputs.commentId });

            await Music.updateOne({ id: comment.musicId }).set({
                commentCount: Math.max((MusicData.commentCount || 0) - 1, 0)
            });

            return exits.success({
                status: true,
                message: `Comment deleted successfully`,
            });

        } catch (error) {
            console.log(error);
            return exits.invalid({
                status: false,
                message: serverErrorMsg,
            });
        }
    }
};
