module.exports = {
    friendlyName: "Add playlist",
    inputs: {
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

            const result = await Playlist.create({
                playlistName: inputs.playlistName,
                userId: loginUserData?.id,
            }).fetch();
            return exits.success({
                status: true,
                message: "Playlist created successfully",
                data: result,
            });
        } catch (error) {
            return exits.invalid({
                status: false,
                message: serverErrorMsg,
                error: error,
            });
        }
    },
};
