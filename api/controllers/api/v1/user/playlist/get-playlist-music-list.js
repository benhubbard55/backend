module.exports = {
    inputs: {
        page: {
            type: "number",
            min: 0,
        },
        limit: {
            type: "number",
            min: 1,
        },
        playlistId: {
            type: "number",
            required: true,
        }
    },
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
    },
    fn: async function (inputs, exits) {
        const data = await sails.helpers.getPaginationList.with({
            request: this.req,
            modelName: "PlaylistMusic",
            whereCondition: { playlistId: inputs.playlistId },
            populate: ["musicId"],
        });
        if (data.status) {
            return exits.success(data);
        } else {
            return exits.invalid(data);
        }
    },
};
