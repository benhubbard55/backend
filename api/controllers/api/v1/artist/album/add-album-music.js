module.exports = {
    friendlyName: "Add Music",
    inputs: {
        musicId: {
            type: "number",
            required: true,
        },
        albumId: {
            type: "number",
            required: true,
        },
    },
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
        badRequest: sails.config.globals.statusCodes.badRequest,
        notFound: sails.config.globals.statusCodes.notFound,
    },
    fn: async function (inputs, exits) {
        try {
            const loginUserData = this.req.loggedInUser;

            const findAlbum = await Album.findOne({
                id: inputs.albumId,
                userId: loginUserData?.id,
            });

            if (!findAlbum) {
                return exits.notFound({
                    status: false,
                    message: "Album not found.",
                });
            }

            const findMusic = await Music.findOne({
                id: inputs.musicId,
                userId: loginUserData?.id,
                isDeleted: false,
            });

            if (!findMusic) {
                return exits.notFound({
                    status: false,
                    message: "Music not found",
                });
            }

            const findMusicinAlbum = await AlbumMusic.findOne({
                albumId: inputs.albumId,
                musicId: inputs.musicId,
                userId: loginUserData?.id,
            });

            if (findMusicinAlbum) {
                return exits.notFound({
                    status: false,
                    message: "You've already added this music.",
                });
            }

            const addMusic = await AlbumMusic.create({
                albumId: inputs.albumId,
                musicId: inputs.musicId,
                userId: loginUserData?.id,
            }).fetch();

            await Album.updateOne({ id: findAlbum.id, }).set({ musicCount: findAlbum?.musicCount + 1 });

            return exits.success({
                status: true,
                message: "Music added successfully",
                data: addMusic,
            });
        } catch (error) {
            console.log("error", error);
            return exits.invalid({
                status: false,
                message: serverErrorMsg,
                error: error,
            });
        }
    },
};
