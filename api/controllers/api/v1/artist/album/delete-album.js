module.exports = {
    inputs: {},
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
        notFound: sails.config.globals.statusCodes.notFound,
    },
    fn: async function (inputs, exits) {
        try {
            const albumId = this.req.params["albumId"];
            const loginUserData = this.req.loggedInUser;

            const findAlbum = await Album.findOne({
                id: albumId,
                userId: loginUserData?.id,
            });

            if (!findAlbum) {
                return exits.notFound({
                    status: false,
                    message: "Album not found",
                });
            }

            await AlbumMusic.destroy({ albumId: albumId, userId: loginUserData?.id })
            if (findAlbum?.albumCoverImage) {
                await sails.helpers.file.deleteFile(
                    findAlbum?.albumCoverImage,
                    sails.config.globals.imagePath.ALBUM_COVER_IMAGE_STORE_PATH
                );
            }

            await Album.destroy({ id: albumId })

            return exits.success({
                status: true,
                message: "Album deleted successfully",
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
