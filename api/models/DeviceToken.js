module.exports = {
    tableName: "deviceTokens",
    fetchRecordsOnCreate: true,
    fetchRecordsOnUpdate: true,
    fetchRecordsOnDestroy: true,
    attributes: {
        userId: {
            model: "User",
        },
        token: {
            type: "string",
            allowNull: true,
        },
        deviceId: {
            type: "string",
            allowNull: true
        }
    },
};
