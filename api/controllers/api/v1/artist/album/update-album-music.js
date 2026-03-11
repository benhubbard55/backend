module.exports = {
    friendlyName: "Add Music",
    inputs: {
        albumMusicId: {
            type: "number",
            required: true,
        },
        musicId: {
            type: "number",
            required: false,
        },
        albumId: {
            type: "number",
            required: false,
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

            const findAlbumMusic = await AlbumMusic.findOne({
                id: inputs.albumMusicId,
                userId: loginUserData?.id,
            });
            if (!findAlbumMusic) {
                return exits.notFound({
                    status: false,
                    message: "Album Music not found",
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

            const updateData = await AlbumMusic.updateOne({ id: inputs.albumMusicId, }).set({ albumId: inputs.albumId, musicId: inputs.musicId });

            return exits.success({
                status: true,
                message: "Album updated successfully",
                data: updateData
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
