module.exports = {
    tableName: "music",
    fetchRecordsOnCreate: true,
    fetchRecordsOnUpdate: true,
    fetchRecordsOnDestroy: true,
    attributes: {
        userId: {
            model: "User",
        },
        title: {
            type: "string",
            required: true,
        },
        description: {
            type: "string",
            required: false,
            allowNull: true,
        },
        musicTypeId: {
            model: "MusicType",
        },
        isPremium: {
            type: "boolean",
            defaultsTo: false,
        },
        amount: {
            type: "number",
            defaultsTo: 0,
        },
        musicFileName: {
            type: "string",
            allowNull: true,
        },
        musicFileDisplayName: {
            type: "string",
            allowNull: true,
        },
        profileImage: {
            type: "string",
            allowNull: true,
        },
        musicProfileType: {
            type: "string",
            defaultsTo: 'image',
            isIn: ['video', 'image']
        },
        musicProfileVideo: {
            type: "string",
            allowNull: true,
        },
        duration: {
            type: "string",
            defaultsTo: "00:00",
        },
        likeCount: {
            type: "number",
            defaultsTo: 0,
        },
        commentCount: {
            type: "number",
            defaultsTo: 0,
        },
        downloadCount: {
            type: "number",
            defaultsTo: 0,
        },
        purchaseCount: {
            type: "number",
            defaultsTo: 0,
        },
        isDeleted: {
            type: "boolean",
            defaultsTo: false,
        },
        fileType: {
            type: "string",
            allowNull: true,
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
            type: "string",
            allowNull: true,
        },
        previewEndTime: {
            type: "string",
            allowNull: true,
        },
    },
    customToJSON: function () {
        if (this.profileImage) {
            this.profileImage =
                sails.config.custom.baseUrl +
                sails.config.globals.imagePath.MUSIC_PROFILE_DISPLAY_IMAGE_PATH +
                "/" +
                this.profileImage;
        } else {
            this.profileImage = null;
        }

        if (this.musicFileName) {
            this.musicFileName =
                sails.config.custom.baseUrl +
                sails.config.globals.imagePath.MUSIC_FILE_DISPLAY_IMAGE_PATH +
                "/" +
                this.musicFileName;
        } else {
            this.musicFileName = null;
        }

        if (this.musicProfileVideo) {
            this.musicProfileVideo =
                sails.config.custom.baseUrl +
                sails.config.globals.imagePath.MUSIC_PROFILE_DISPLAY_VIDEO_PATH +
                "/" +
                this.musicProfileVideo;
        } else {
            this.musicProfileVideo = null;
        }


        return _.omit(this);
    },
};
