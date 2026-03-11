module.exports = {
    friendlyName: "Update Music",
    inputs: {
        title: {
            type: "string",
            required: false,
        },
        description: {
            type: "string",
            required: false,
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
        musicProfileType: {
            type: "string",
            defaultsTo: "image",
            isIn: ["video", "image"],
        },
        profileImage: {
            type: "string",
            required: false,
        },
        musicProfileVideo: {
            type: "string",
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
            const musicId = this.req.params["musicId"];

            const updateObj = inputs;

            const findMusic = await Music.findOne({
                id: musicId,
                userId: loginUserData?.id,
                isDeleted: false,
            });

            if (!findMusic) {
                return exits.notFound({
                    status: false,
                    message: "Music not found",
                });
            }

            const findMusicType = await MusicType.findOne({
                id: inputs.musicTypeId,
            });

            if (!findMusicType) {
                return exits.notFound({
                    status: false,
                    message: "Music type not found",
                });
            }

            if (inputs?.profileImage || inputs?.musicProfileVideo) {
                if (findMusic?.profileImage) {
                    const test = await sails.helpers.file.deleteFile(
                        findMusic?.profileImage,
                        sails.config.globals.imagePath.MUSIC_PROFILE_IMAGE_STORE_PATH
                    );
                }
                if (findMusic?.musicProfileVideo) {
                    await sails.helpers.file.deleteFile(
                        findMusic?.musicProfileVideo,
                        sails.config.globals.imagePath.MUSIC_PROFILE_VIDEO_STORE_PATH
                    );
                    updateObj.musicProfileVideo = inputs?.musicProfileVideo || null;
                }
            }

            const updateMusic = await Music.updateOne({
                id: musicId,
            }).set({
                ...updateObj,
                userId: loginUserData?.id,
            });

            return exits.success({
                status: true,
                message: "Music updated successfully",
                data: updateMusic,
            });
        } catch (error) {
            return exits.invalid({
                status: false,
                message: serverErrorMsg,
                error: error,
            });
        }
    },
};
