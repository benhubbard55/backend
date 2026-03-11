module.exports = {
    friendlyName: "update playlist",
    inputs: {
        playlistId: {
            type: "number",
            required: true,
        },
        playlistName: {
            type: "string",
            required: true,
        },
    },
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
        badRequest: sails.config.globals.statusCodes.badRequest,
        notFound: sails.config.globals.statusCodes.notFound,
    },
    fn: async function (inputs, exits) {
        try {
            const loginUserData = this.req.loggedInUser;

            const findPlaylistName = await Playlist.findOne({
                playlistName: inputs.playlistName,
                userId: loginUserData?.id,
            });

            if (findPlaylistName) {
                return exits.notFound({
                    status: false,
                    message: "You've already used this playlist name.",
                });
            }

            await Playlist.updateOne({ id: inputs.playlistId, }).set({ playlistName: inputs.playlistName, });

            return exits.success({
                status: true,
                message: "Playlist name updated successfully",
            });
        } catch (error) {
            console.log("error", error);
            return exits.invalid({
                status: false,
                message: serverErrorMsg,
                error: error,
            });
        }
    },
};
