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
    },
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
    },
    fn: async function (inputs, exits) {
        const findMusicId = this.req.query["musicId"];
        const data = await sails.helpers.getPaginationList.with({
            request: this.req,
            modelName: "Comment",
            whereCondition: { musicId: findMusicId },
            populate: ["commentBy"],
            sortBy: "id desc"
        });
        if (data.status) {
            return exits.success(data);
        } else {
            return exits.invalid(data);
        }
    },
};
