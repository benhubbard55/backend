module.exports = {
    friendlyName: "Update",
    description: "Update user.",
    inputs: {
        genreName: {
            type: "string",
            required: true,
        },
        isActive: {
            type: "boolean",
            defaultsTo: true,
        },
    },
    exits: {
        redirect: {
            responseType: "redirect",
        },
    },

    fn: async function (inputs, exits) {
        const { genreName, isActive } = inputs
        const musicTypeId = this.req.params["musicTypeId"];

        const findMusic = await MusicType.findOne({
            id: musicTypeId,
        });

        if (!findMusic) {
            this.req.session.flash = {
                type: "error",
                message: "Music type not found",
            };
        }

        const findMusicType = await MusicType.findOne({
            genreName: genreName,
            isActive: true,
            id: { "!=": musicTypeId },
        });
        if (findMusicType) {
            this.req.session.flash = {
                type: "error",
                message: "Music type already added",
            };
        }

        await MusicType.updateOne({ id: musicTypeId }).set({
            genreName: genreName,
            isActive: isActive
        });

        this.req.session.flash = {
            type: "success",
            message: "Music type update successfully",
        };

        throw {
            redirect: "/admin/music-type",
        };
    },
};
