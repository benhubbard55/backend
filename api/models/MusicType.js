module.exports = {
    tableName: "musicType",
    fetchRecordsOnCreate: true,
    fetchRecordsOnUpdate: true,
    fetchRecordsOnDestroy: true,
    attributes: {
        genreName: {
            type: "string",
            required: true,
        },
        isActive: {
            type: "boolean",
            defaultsTo: true,
        },
    },
};
