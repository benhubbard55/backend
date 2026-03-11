module.exports = {
    friendlyName: "Edit",
    description: "Edit user.",
    inputs: {},
    exits: {
        success: {
            viewTemplatePath: "admin/music-type/edit",
        },
        redirect: {
            responseType: "redirect",
        },
    },

    fn: async function (inputs, exits) {
        var musicTypeId = this.req.params["musicTypeId"];
        var userRecord = await MusicType.findOne({
            id: musicTypeId,
        });

        return exits.success({
            userRecord: userRecord,
        });
    },
};
