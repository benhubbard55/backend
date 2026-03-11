module.exports = {
    tableName: "likes",
    fetchRecordsOnCreate: true,
    fetchRecordsOnUpdate: true,
    fetchRecordsOnDestroy: true,
    attributes: {
        likedBy: {
            model: "User",
        },
        likedTo: {
            model: "User",
        },
        musicId: {
            model: "Music"
        }
    },
};
