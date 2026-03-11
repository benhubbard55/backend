module.exports = {
    friendlyName: "Menu helper",
    description: "",
    inputs: {
        userId: {
            type: "number",
            required: true,
        },
        musicId: {
            type: "number",
            required: true,
        },
    },
    exits: {
        success: {
            description: "All done.",
        },
    },

    fn: async function (inputs, exits) {
        const findMusicLiked = await Like.find({
            likedBy: inputs.userId,
            musicId: inputs.musicId,
        }).sort("id DESC");
        return exits.success(findMusicLiked.length > 0 ? true : false);
    },
};
