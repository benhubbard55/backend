module.exports = {
    tableName: "broadcasts",
    fetchRecordsOnCreate: true,
    fetchRecordsOnUpdate: true,
    fetchRecordsOnDestroy: true,
    attributes: {
        title: {
            type: "string",
            allowNull: true,
        },
        description: {
            type: "string",
            allowNull: true,
        },
        showTo: {
            type: "string",
            isIn: ["users", "artists", "allUsers"],
            allowNull: true,
        },
    },
};
