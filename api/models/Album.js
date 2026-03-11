module.exports = {
    tableName: "album",
    fetchRecordsOnCreate: true,
    fetchRecordsOnUpdate: true,
    fetchRecordsOnDestroy: true,
    attributes: {
        albumName: {
            type: 'string',
            required: true,
        },
        userId: {
            model: "User",
        },
        musicCount: {
            type: "number",
            defaultsTo: 0,
        },
        albumCoverImage: {
            type: "string",
            required: false,
            allowNull: true,
        },
        // isDeleted: {
        //     type: "boolean",
        //     defaultsTo: false,
        // },
    },
    customToJSON: function () {
        if (this.albumCoverImage) {
            this.albumCoverImage = sails.config.custom.baseUrl + sails.config.globals.imagePath.ALBUM_COVER_IMAGE_DISPLAY_PATH + '/' + this.albumCoverImage;
        } else {
            this.albumCoverImage = null;
        }
        return _.omit(this);
    }
};