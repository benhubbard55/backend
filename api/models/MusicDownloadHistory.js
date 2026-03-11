module.exports = {
    tableName: "musicDownloadHistories",
    fetchRecordsOnCreate: true,
    fetchRecordsOnUpdate: true,
    fetchRecordsOnDestroy: true,
    attributes: {
        userId: {
            model: "User",
        },
        musicId: {
            model: "Music",
        },
    },
};
