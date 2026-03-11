module.exports = {
    friendlyName: "Update",
    description: "Update user.",
    inputs: {
        title: {
            type: "string",
            required: true,
        },
        description: {
            type: "string",
            required: true,
        },
        musicTypeId: {
            type: "number",
            required: true,
        },
        isPremium: {
            type: "boolean",
            required: true,
        },
        amount: {
            type: "number",
            defaultsTo: 0,
        },
        fileType: {
            type: "string",
            defaultsTo: ".mp3",
        },
        minutes: {
            type: "number",
            defaultsTo: 0,
        },
        seconds: {
            type: "number",
            defaultsTo: 0,
        },
    },
    exits: {
        redirect: {
            responseType: "redirect",
        },
    },

    fn: async function (inputs, exits) {
        try {
            const musicId = this.req.params["musicId"];
            const updateObj = inputs;

            const findMusic = await Music.findOne({
                id: musicId,
            });

            if (!findMusic) {
                throw "Music not found";
            }

            if (this.req._fileparser?.upstreams.length > 0) {
                //Music profile
                const musicProfileFileUploadResponse =
                    await sails.helpers.file.fileUpload(
                        this.req,
                        "musicProfile",
                        sails.config.globals.imagePath.MUSIC_PROFILE_IMAGE_STORE_PATH,
                        ""
                    );
                if (musicProfileFileUploadResponse?.uploadedFiles?.length > 0) {
                    if (findMusic?.profileImage) {
                        const deleteFile = await sails.helpers.file.deleteFile(
                            findMusic?.profileImage,
                            sails.config.globals.imagePath.MUSIC_PROFILE_IMAGE_STORE_PATH
                        );
                    }

                    const fileName =
                        musicProfileFileUploadResponse?.uploadedFiles[0].uploadFileName;
                    updateObj.profileImage = fileName;
                }
            }
            await Music.updateOne({
                id: musicId,
            }).set(updateObj);

            this.req.session.flash = {
                type: "success",
                message: "Music update successfully",
            };
        } catch (error) {
            console.log("error :>> ", error);
            this.req.session.flash = {
                type: "error",
                message: error || serverErrorMsg,
            };
        } finally {
            throw {
                redirect: "/admin/music",
            };
        }
    },
};
