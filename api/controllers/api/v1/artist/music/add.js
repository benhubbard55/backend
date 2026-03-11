module.exports = {
    friendlyName: "Add Music",
    inputs: {
        title: {
            type: "string",
            required: true,
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
        previewStartTime: {
            type: "ref",
            defaultsTo: null,
        },
        previewEndTime: {
            type: "ref",
            defaultsTo: null,
        },
        musicProfileType: {
            type: "string",
            defaultsTo: "image",
            isIn: ["video", "image"],
        },
        profileImage: {
            type: "string",
            required: true,
        },
        musicFileName: {
            type: "string",
            required: true,
        },
        musicProfileVideo: {
            type: "string",
            required: false,
        },
        musicFileDisplayName: {
            type: "string",
            required: false,
        }
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

            const createObj = inputs;

            const findMusicType = await MusicType.findOne({
                id: inputs.musicTypeId,
            });

            if (!findMusicType) {
                return exits.notFound({
                    status: false,
                    message: "Music type not found",
                });
            }

            const musicStoragePath =
                sails.config.globals.imagePath.MUSIC_FILE_STORE_PATH;
            const urlToGetDuration =
                musicStoragePath + "/" + inputs?.musicFileName;
            const getDuration = await sails.helpers.getAudioDuration(
                urlToGetDuration
            );
            createObj.duration = getDuration;

            const createMusic = await Music.create({
                ...createObj,
                userId: loginUserData?.id,
            }).fetch();
            return exits.success({
                status: true,
                message: "Music added successfully",
                data: createMusic,
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
