module.exports = {
    friendlyName: "Edit",
    description: "Edit user.",
    inputs: {},
    exits: {
        success: {
            viewTemplatePath: "admin/music/edit",
        },
        redirect: {
            responseType: "redirect",
        },
    },

    fn: async function (inputs, exits) {
        var musicId = this.req.params["musicId"];
        var musicRecord = await Music.findOne({
            id: musicId,
        });
        musicRecord = musicRecord?.toJSON();
        return exits.success({
            musicRecord: musicRecord,
        });
    },
};
