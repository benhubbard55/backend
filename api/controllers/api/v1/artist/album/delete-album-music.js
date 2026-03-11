module.exports = {
    inputs: {},
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
        notFound: sails.config.globals.statusCodes.notFound,
    },
    fn: async function (inputs, exits) {
        try {
            const albumMusicId = this.req.params["albumMusicId"];
            const loginUserData = this.req.loggedInUser;

            const findMusic = await AlbumMusic.findOne({ id: albumMusicId })
            if (!findMusic) {
                return exits.notFound({
                    status: false,
                    message: "This music not in album",
                });
            }

            const findAlbum = await Album.findOne({
                id: findMusic?.albumId,
                userId: loginUserData?.id,
            })
            if (!findAlbum) {
                return exits.notFound({
                    status: false,
                    message: "Album not found.",
                });
            }

            await AlbumMusic.destroy({ id: albumMusicId })
            await Album.updateOne({ id: findAlbum.id, }).set({ musicCount: Math.max((findAlbum.musicCount || 0) - 1, 0) });

            return exits.success({
                status: true,
                message: "Music removed successfully",
            });
        } catch (error) {
            console.log(error);
            return exits.invalid({
                status: false,
                message: serverErrorMsg,
            });
        }
    },
};
