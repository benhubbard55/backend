module.exports = {
    friendlyName: "Menu helper",
    description: "",
    inputs: {
        userId: {
            type: "number",
            required: true,
        },
        artistId: {
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
        const findMusicLiked = await Follower.find({
            followedBy: inputs.userId,
            followedTo: inputs.artistId,
        }).sort("id DESC");
        return exits.success(findMusicLiked.length > 0 ? true : false);
    },
};
