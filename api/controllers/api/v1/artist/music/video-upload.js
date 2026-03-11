const path = require('path');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
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
                const fileUploadResponse = await sails.helpers.file.fileUpload(
                    req,
                    "musicProfileVideo",
                    sails.config.globals.imagePath.MUSIC_PROFILE_VIDEO_STORE_PATH,
                    ""
                );

                if (fileUploadResponse?.uploadedFiles.length > 0) {
                    const uploadedPath = fileUploadResponse.uploadedFiles[0].fd;
                    const fileName = fileUploadResponse.uploadedFiles[0].uploadFileName;
                    const fileBaseName = path.basename(fileName, path.extname(fileName));
                    
                    const thumbnailFolder = sails.config.globals.imagePath.MUSIC_PROFILE_IMAGE_STORE_PATH;
                    const thumbnailPath = path.join(thumbnailFolder, `${fileBaseName}.png`);
                    
                    await new Promise((resolve, reject) => {
                        ffmpeg(uploadedPath)
                            .on('end', () => {
                                resolve();
                            })
                            .on('error', (err) => {
                                console.error("Thumbnail generation failed:", err);
                                reject(err);
                            })
                            .screenshots({
                                timestamps: ['50%'],
                                filename: `${fileBaseName}.png`,
                                folder: thumbnailFolder,
                                size: '320x240'
                            });
                    });

                    return exits.success({
                        status: true,
                        message: "Video uploaded and thumbnail created successfully",
                        data: {
                            video: fileName,
                            thumbnail: `${fileBaseName}.png`,
                        },
                    });
                } else {
                    return exits.invalid({
                        status: false,
                        message: "Video upload failed",
                    });
                }
            } else {
                return exits.badRequest({
                    status: false,
                    message: "No file uploaded",
                });
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
