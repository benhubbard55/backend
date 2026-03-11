module.exports = {
    friendlyName: "Show",
    description: "Show user.",
    inputs: {},
    exits: {
        success: {
            viewTemplatePath: "admin/user/show",
        },
        // redirect: {
        //     responseType: "redirect",
        // },
    },

    fn: async function (inputs, exits) {
        var userId = this.req.params["userId"];

        let findUser = await User.findOne({ id: userId });

        findUser = findUser?.toJSON();

        //Like Count
        const findLikedCount = await Like.count({ likedBy: userId });
        findUser.likeCount = findLikedCount || 0;

        //Follow Count
        const findFollowCount = await Follower.count({ followedBy: userId });
        findUser.followCount = findFollowCount || 0;

        //Buy Music Count
        const findBuyMusicCount = await TransactionHistory.count({ userId: userId, transferType: "buyMusic", status: "success" });
        findUser.findBuyMusicCount = findBuyMusicCount || 0;

        return exits.success({
            userRecord: findUser || {},
        });
    },
};
