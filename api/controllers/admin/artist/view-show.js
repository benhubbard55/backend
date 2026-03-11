module.exports = {
    friendlyName: "Show",
    description: "Show user.",
    inputs: {},
    exits: {
        success: {
            viewTemplatePath: "admin/artist/show",
        },
        // redirect: {
        //     responseType: "redirect",
        // },
    },

    fn: async function (inputs, exits) {
        var artistId = this.req.params["artistId"];

        let findUser = await User.findOne({ id: artistId });

        findUser = findUser?.toJSON();
        //Follow Count
        const findFollowCount = await Follower.count({ followedTo: artistId });
        findUser.followCount = findFollowCount || 0;


        return exits.success({
            userRecord: findUser || {},
        });
    },
};
