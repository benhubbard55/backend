module.exports = {
    inputs: {},
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
        notFound: sails.config.globals.statusCodes.notFound,
    },
    fn: async function (inputs, exits) {
        try {
            const musicId = this.req.params["musicId"];
            const loginUserData = this.req.loggedInUser;

            const findMusic = await Music.findOne({
                id: musicId,
                userId: loginUserData?.id,
            });

            if (!findMusic) {
                return exits.notFound({
                    status: false,
                    message: "Music not found",
                });
            }

            // Delete the music
            await Music.updateOne({
                id: findMusic?.id,
            }).set({ isDeleted: true });

            await AlbumMusic.update({ musicId: findMusic.id })
                .set({ isDeleted: true });

            await PlaylistMusic.update({ musicId: findMusic.id })
                .set({ isDeleted: true });

            return exits.success({
                status: true,
                message: "Music deleted successfully",
            });
        } catch (error) {
            return exits.invalid({
                status: false,
                message: serverErrorMsg,
            });
        }
    },
};
