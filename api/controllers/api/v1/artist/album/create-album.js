module.exports = {
    friendlyName: "Add album",
    inputs: {
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
            const findAlbumname = await Album.findOne({
                albumName: inputs.albumName,
                userId: loginUserData?.id,
            });

            if (findAlbumname) {
                return exits.notFound({
                    status: false,
                    message: "You've already used this album name.",
                });
            }
            const req = this.req;
            if (req._fileparser?.upstreams.length > 0) {
                var fileUploadResponse = await sails.helpers.file.fileUpload(
                    req,
                    "albumCoverImage",
                    sails.config.globals.imagePath.ALBUM_COVER_IMAGE_STORE_PATH,
                    ""
                );

                if (fileUploadResponse?.uploadedFiles.length > 0) {
                    const fileName = fileUploadResponse?.uploadedFiles[0].uploadFileName;
                    albumCoverImage = fileName;
                } else {
                    return exits.invalid({
                        status: false,
                        message: "Album cover image upload failed",
                    });
                }
            }
            const createAlbum = await Album.create({
                albumName: inputs.albumName,
                userId: loginUserData?.id,
                albumCoverImage: albumCoverImage,
            }).fetch();

            return exits.success({
                status: true,
                message: "Album created successfully",
                data: createAlbum,
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
