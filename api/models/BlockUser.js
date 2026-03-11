module.exports = {
    tableName: "blockUser",
    fetchRecordsOnCreate: true,
    fetchRecordsOnUpdate: true,
    fetchRecordsOnDestroy: true,
    attributes: {
        blockBy: {
            model: "User",
        },
        blockTo: {
            model: "User",
        },
    },
};
