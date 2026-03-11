module.exports = {
    tableName: "reportUser",
    fetchRecordsOnCreate: true,
    fetchRecordsOnUpdate: true,
    fetchRecordsOnDestroy: true,
    attributes: {
        reportBy: {
            model: "User",
        },
        reportTo: {
            model: "User",
        },
        musicId: {
            model: "Music",
        },
        reason: {
            type: "string",
            required: false,
        }
    },
};
