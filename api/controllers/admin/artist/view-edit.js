module.exports = {
    friendlyName: "Edit",
    description: "Edit user.",
    inputs: {},
    exits: {
        success: {
            viewTemplatePath: "admin/artist/edit",
        },
        redirect: {
            responseType: "redirect",
        },
    },

    fn: async function (inputs, exits) {
        var artist_id = this.req.params["artistId"];
        var artistRecord = await User.findOne({
            id: artist_id,
        })
        artistRecord = artistRecord?.toJSON();

        return exits.success({
            userRecord: artistRecord,
        });
    },
};
