module.exports.globals = {
    _: require("lodash"),

    async: false,

    models: true,

    sails: true,

    statusCodes: {
        success: {
            statusCode: 200,
            description: "All done.",
        },
        invalid: {
            statusCode: 500,
            description: "Internal server error",
        },
        badRequest: {
            statusCode: 400,
            description: "Bad Request",
        },
        notFound: {
            statusCode: 404,
            description: "Record not found",
        },
        conflict: {
            statusCode: 409,
            description: "Data already exits",
        },
        normalError: {
            statusCode: 403,
            description: "Normal error",
        },
        successWithEmpty: {
            statusCode: 201,
            description: "Data list not found",
        },
    },

    imagePath: {
        USER_PROFILE_IMAGE_STORE_PATH: "assets/uploads/user/profile",
        // USER_PROFILE_DISPLAY_IMAGE_PATH: "/uploads/user/profile",
        USER_PROFILE_DISPLAY_IMAGE_PATH: "/assets/uploads/user/profile",

        MUSIC_PROFILE_IMAGE_STORE_PATH: "assets/uploads/music/profile",
        // MUSIC_PROFILE_DISPLAY_IMAGE_PATH: "/uploads/music/profile",
        MUSIC_PROFILE_DISPLAY_IMAGE_PATH: "/assets/uploads/music/profile",
        MUSIC_PROFILE_VIDEO_STORE_PATH: "assets/uploads/music/video",
        MUSIC_PROFILE_DISPLAY_VIDEO_PATH: "/assets/uploads/music/video",
        ALBUM_COVER_IMAGE_STORE_PATH: "assets/uploads/album/cover",
        ALBUM_COVER_IMAGE_DISPLAY_PATH: "/assets/uploads/album/cover",

        MUSIC_FILE_STORE_PATH: "assets/uploads/music/file",
        // MUSIC_FILE_DISPLAY_IMAGE_PATH: "/uploads/music/file",
        MUSIC_FILE_DISPLAY_IMAGE_PATH: "/assets/uploads/music/file",

        DEFAULT_IMAGE: "/images/defaultImages/imageNotFound.png",
    },

    CONSTANTS: {
        RECORD_LIMIT_PER_PAGE: 10
    }
};
