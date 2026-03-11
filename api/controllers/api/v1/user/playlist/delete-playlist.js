module.exports = {
    inputs: {},
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
        notFound: sails.config.globals.statusCodes.notFound,
    },
    fn: async function (inputs, exits) {
        try {
            const playlistId = this.req.params["playlistId"];
            const loginUserData = this.req.loggedInUser;

            const findAlbum = await Playlist.findOne({
                id: playlistId,
                userId: loginUserData?.id,
            });

            if (!findAlbum) {
                return exits.notFound({
                    status: false,
                    message: "Playlist not found",
                });
            }
            await PlaylistMusic.destroy({ playlistId: playlistId, userId: loginUserData?.id })

            await Playlist.destroy({ id: playlistId })

            return exits.success({
                status: true,
                message: "Playlist deleted successfully",
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
