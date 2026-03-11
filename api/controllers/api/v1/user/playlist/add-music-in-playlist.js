module.exports = {
    friendlyName: "Add Music",
    inputs: {
        musicId: {
            type: "number",
            required: true,
        },
        playlistId: {
            type: "number",
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

            const findPlaylist = await Playlist.findOne({
                id: inputs.playlistId,
                userId: loginUserData?.id,
            })

            if (!findPlaylist) {
                return exits.notFound({
                    status: false,
                    message: "Playlist not found.",
                });
            }

            const findMusic = await PlaylistMusic.findOne({
                playlistId: inputs.playlistId,
                musicId: inputs.musicId,
                userId: loginUserData?.id,
            });

            if (findMusic) {
                return exits.notFound({
                    status: false,
                    message: "You've already added this music.",
                });
            }

            const addMusic = await PlaylistMusic.create({
                playlistId: inputs.playlistId,
                musicId: inputs.musicId,
                userId: loginUserData?.id,
            }).fetch();

            await Playlist.updateOne({ id: findPlaylist.id, }).set({ musicCount: findPlaylist?.musicCount + 1 });

            return exits.success({
                status: true,
                message: "Music added successfully",
                data: addMusic,
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
