module.exports = {
    tableName: "comments",
    fetchRecordsOnCreate: true,
    fetchRecordsOnUpdate: true,
    fetchRecordsOnDestroy: true,
    attributes: {
        commentBy: {
            model: "User",
        },
        musicId: {
            model: "Music",
        },
        content: {
            type: "string",
            required: false,
        }
    },
};
