module.exports = {
    friendlyName: 'Create comment',
    description: '',
    inputs: {
        musicId: {
            type: "number",
            required: true,
        },
        content: {
            type: "string",
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
            const music = await Music.findOne({ id: inputs.musicId });

            if (!music) {
                return exits.invalid({
                    message: 'Music not found',
                    status: false
                });
            }

            const newComment = await Comment.create({
                musicId: inputs.musicId,
                commentBy: loginUserData?.id,
                content: inputs.content,
            }).fetch();

            const commentData = await Comment.find({ id: newComment.id }).populate('commentBy');

            const test = await Music.updateOne({ id: inputs.musicId }).set({
                commentCount: (music.commentCount || 0) + 1
            });

            sails.sockets.blast('comment', {
                action: 'new-comment',
                data: { newComment },
                message: "New comment added"
            });

            return exits.success({
                status: true,
                message: `Comment Added successfully`,
                data: commentData
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
