module.exports = {
    inputs: {
        musicId: {
            type: "number",
            required: true,
        },
    },
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
        notFound: sails.config.globals.statusCodes.notFound,
    },
    fn: async function (inputs, exits) {
        try {
            const loginUserData = this.req.loggedInUser;
            const { musicId } = inputs;

            const findMusic = await Music.findOne({ id: musicId, isDeleted: false });

            if (!findMusic) {
                return exits.notFound({
                    success: false,
                    message: "Music not found",
                });
            }

            const [isAlreadyDownload] = await MusicDownloadHistory.find({
                musicId: musicId,
                userId: loginUserData?.id,
            })
                .sort("id desc")
                .limit(1);

            if (!isAlreadyDownload) {
                await MusicDownloadHistory.create({
                    musicId,
                    userId: loginUserData?.id,
                });
                const count = findMusic.downloadCount + 1;

                const updatedMusic = await Music.updateOne({
                    id: musicId,
                }).set({ downloadCount: count });

                return exits.success({
                    status: true,
                    message: "Music purchased successfully",
                    data: updatedMusic,
                });
            } else {
                return exits.success({
                    status: true,
                    message: "Music already purchased",
                    data: findMusic,
                });
            }
        } catch (error) {
            return exits.invalid({
                status: false,
                message: serverErrorMsg,
                error: error,
            });
        }
    },
};
