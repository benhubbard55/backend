module.exports = {
    tableName: "playlistMusic",
    fetchRecordsOnCreate: true,
    fetchRecordsOnUpdate: true,
    fetchRecordsOnDestroy: true,
    attributes: {
        musicId: {
            model: 'Music',
        },
        playlistId: {
            model: 'Playlist',
        },
        userId: {
            model: "User",
        },
    },
};
