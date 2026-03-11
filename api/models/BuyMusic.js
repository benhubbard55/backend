module.exports = {
    tableName: "buyMusic",
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
        artistId: {
            model: "User",
        },
        status: {
            type: "string",
            isIn: ["approved", "pending", "completed", "canceled", "failed"],
            allowNull: true
        },
    },
};
