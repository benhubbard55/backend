module.exports = {
    friendlyName: "Add Music",
    inputs: {
    },
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
        badRequest: sails.config.globals.statusCodes.badRequest,
        notFound: sails.config.globals.statusCodes.notFound,
    },
    fn: async function (inputs, exits) {
        try {
            const req = this.req;
            if (req._fileparser?.upstreams.length > 0) {
                var fileUploadResponse = await sails.helpers.file.fileUpload(
                    req,
                    "musicProfile",
                    sails.config.globals.imagePath.MUSIC_PROFILE_IMAGE_STORE_PATH,
                    ""
                );

                if (fileUploadResponse?.uploadedFiles.length > 0) {
                    const fileName = fileUploadResponse?.uploadedFiles[0].uploadFileName;
                    profileImage = fileName;
                    return exits.success({
                        status: true,
                        message: "Media uploaded successfully",
                        data: fileName,
                    });
                } else {
                    return exits.invalid({
                        status: false,
                        message: serverErrorMsg,
                    });
                }
            }
        } catch (error) {
            return exits.invalid({
                status: false,
                message: serverErrorMsg,
                error: error,
            });
        }
    },
};
