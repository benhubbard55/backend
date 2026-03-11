module.exports = {
    friendlyName: "update Album",
    inputs: {
        albumId: {
            type: "number",
            required: true,
        },
        albumName: {
            type: "string",
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
            let albumCoverImage = null;

            const findAlbum = await Album.findOne({
                id: inputs.albumId,
                userId: loginUserData?.id,
            });

            if (!findAlbum) {
                return exits.notFound({
                    status: false,
                    message: "Album not found",
                });
            }
            const findAlbumname = await Album.findOne({
                albumName: inputs.albumName,
                userId: loginUserData?.id,
                id: {
                    '!=': inputs.albumId
                }
            });

            if (findAlbumname) {
                return exits.notFound({
                    status: false,
                    message: "You've already used this album name.",
                });
            }
            albumCoverImage = findAlbum?.albumCoverImage;

            if (this.req._fileparser?.upstreams.length > 0) {
                var fileUploadResponse = await sails.helpers.file.fileUpload(
                    this.req,
                    "albumCoverImage",
                    sails.config.globals.imagePath.ALBUM_COVER_IMAGE_STORE_PATH,
                    ""
                );

                if (fileUploadResponse?.uploadedFiles.length > 0) {
                    if (findAlbum?.albumCoverImage) {
                        await sails.helpers.file.deleteFile(
                            findAlbum?.albumCoverImage,
                            sails.config.globals.imagePath.ALBUM_COVER_IMAGE_STORE_PATH
                        );
                    }

                    const fileName = fileUploadResponse?.uploadedFiles[0].uploadFileName;
                    albumCoverImage = fileName;
                }
            }

           const updateAlbum = await Album.updateOne({ id: inputs.albumId, }).set({ albumName: inputs.albumName, albumCoverImage: albumCoverImage });

            return exits.success({
                status: true,
                message: "Album name updated successfully",
                data: updateAlbum,
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
