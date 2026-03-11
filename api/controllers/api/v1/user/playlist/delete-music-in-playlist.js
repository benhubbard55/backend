module.exports = {
    inputs: {},
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
        notFound: sails.config.globals.statusCodes.notFound,
    },
    fn: async function (inputs, exits) {
        try {
            const loginUserData = this.req.loggedInUser;
            const playlistMusicId = this.req.params["playlistMusicId"];

            const findMusic = await PlaylistMusic.findOne({ id: playlistMusicId })

            if (!findMusic) {
                return exits.notFound({
                    status: false,
                    message: "This music not in playlist",
                });
            }
            const findPlaylist = await Playlist.findOne({
                id: findMusic?.playlistId,
                userId: loginUserData?.id,
            })

            if (!findPlaylist) {
                return exits.notFound({
                    status: false,
                    message: "Playlist not found.",
                });
            }

            await PlaylistMusic.destroy({ id: playlistMusicId })
            await Playlist.updateOne({ id: findPlaylist.id, }).set({ musicCount: Math.max((findPlaylist.musicCount || 0) - 1, 0) });

            return exits.success({
                status: true,
                message: "Music removed successfully",
            });
        } catch (error) {
            console.log(error);
            return exits.invalid({
                status: false,
                message: serverErrorMsg,
            });
        }
    },
};
