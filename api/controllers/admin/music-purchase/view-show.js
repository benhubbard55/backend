module.exports = {
    inputs: {},
    exits: {
        success: {
            viewTemplatePath: "admin/music-purchase/show",
        },
    },

    fn: async function (inputs, exits) {
        var musicId = this.req.params["musicId"];

        let findUser = await Music.findOne({ id: musicId }).populateAll();

        findUser = findUser?.toJSON();

        return exits.success({
            musicRecord: findUser || {},
        });
    },
};
