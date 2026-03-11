module.exports = {
    tableName: "albumMusic",
    fetchRecordsOnCreate: true,
    fetchRecordsOnUpdate: true,
    fetchRecordsOnDestroy: true,
    attributes: {
        musicId: {
            model: 'Music',
        },
        albumId: {
            model: 'Album',
        },
        userId: {
            model: "User",
        },
    },
};
