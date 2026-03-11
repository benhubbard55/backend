module.exports = {
    tableName: "playlist",
    fetchRecordsOnCreate: true,
    fetchRecordsOnUpdate: true,
    fetchRecordsOnDestroy: true,
    attributes: {
        playlistName: {
            type: 'string',
            required: true,
        },
        userId: {
            model: "User",
        },
        musicCount: {
            type: "number",
            defaultsTo: 0,
        }
    },
};
