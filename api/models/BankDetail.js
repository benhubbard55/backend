module.exports = {
    tableName: "bankDetails",
    fetchRecordsOnCreate: true,
    fetchRecordsOnUpdate: true,
    fetchRecordsOnDestroy: true,
    attributes: {
        artistId: {
            model: "User",
        },
        sourceId: {
            type: "string",
            allowNull: true,
        },
    },
};
