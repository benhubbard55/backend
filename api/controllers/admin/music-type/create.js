module.exports = {
    friendlyName: "Create",

    description: "Create admin.",

    inputs: {
        genreName: {
            type: "string",
            required: true,
        },
        isActive: {
            type: "boolean",
            defaultsTo: false,
        },
    },
    exits: {
        invalid: {
            statusCode: 409,
            description: "Name and City is required.",
        },
        redirect: {
            responseType: "redirect",
        },
    },

    fn: async function (inputs, exits) {
        const findMusicType = await MusicType.findOne({
            genreName: inputs.genreName,
            isActive: inputs.isActive,
        });
        if (findMusicType) {
            this.req.session.flash = {
                type: "error",
                message: "Music type already added",
            };
        }

        await MusicType.create({
            genreName: inputs.genreName,
            isActive: inputs.isActive,
        });

        this.req.session.flash = {
            type: "success",
            message: "Music Type Created successfully",
        };
        throw {
            redirect: "/admin/music-type",
        };
    },
};
