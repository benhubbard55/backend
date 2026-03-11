module.exports = {
    tableName: "followers",
    fetchRecordsOnCreate: true,
    fetchRecordsOnUpdate: true,
    fetchRecordsOnDestroy: true,
    attributes: {
        followedBy: {
            model: "User",
        },
        followedTo: {
            model: "User",
        },
    },
};
