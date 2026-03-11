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
        albumId: {
            type: "number",
            required: true,
        }
    },
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
    },
    fn: async function (inputs, exits) {
        const album = await Album.findOne({
            where: {
                id: inputs.albumId,
            },
        });

        const data = await sails.helpers.getPaginationList.with({
            request: this.req,
            modelName: "AlbumMusic",
            whereCondition: { albumId: inputs.albumId },
            populate: ["musicId"],
        });
        if (data.status) {
            return exits.success({
                status: true,
                message: "Album music list fetched successfully",
                data: {
                    album: album,
                    musicList: data.data,
                },
                pagination: data.pagination
            });
        } else {
            return exits.invalid(data);
        }
    },
};
