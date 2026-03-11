module.exports = {
    friendlyName: "Like",
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

            const findMusic = await Music.findOne({
                id: musicId,
                isDeleted: false,
            });

            let responseMessage,
                likePublishResponse,
                likeCount = findMusic?.likeCount || 0;

            if (!findMusic) {
                return exits.notFound({
                    status: false,
                    message: "Music not found",
                });
            }

            const findLikedMusic = await Like.findOne({
                likedBy: loginUserData?.id,
                musicId: musicId,
            });

            if (findLikedMusic) {
                await Like.destroy({
                    likedBy: loginUserData?.id,
                    musicId: musicId,
                });
                if (likeCount > 0) {
                    likeCount -= 1;
                }

                await Notification.destroy({
                    senderId: loginUserData.id,
                    receiverId: findMusic?.userId,
                    notificationType: "likeMusic",
                });

                followPublishData = {
                    action: "unlikeMusic",
                    data: {
                        userData: loginUserData,
                    },
                    message: `${loginUserData?.name} unlike ${findMusic?.title}`,
                };
                responseMessage = {
                    status: true,
                    message: "Music unlike successfully",
                };
            } else {
                await Like.create({
                    likedBy: loginUserData?.id,
                    musicId: musicId,
                });

                if (loginUserData.id !== findMusic?.userId) {
                    await sails.helpers.addNotification.with({
                        senderId: loginUserData.id,
                        receiverId: findMusic?.userId,
                        notificationType: "likeMusic",
                        redirectId: findMusic?.id,
                        title: "Music Like",
                        description: `${loginUserData?.name} likes your music ${findMusic?.title}`,
                    });
                }

                likeCount += 1;

                followPublishData = {
                    action: "likeMusic",
                    data: {
                        userData: loginUserData,
                    },
                    message: `${loginUserData?.name} like ${findMusic?.title}`,
                };
                responseMessage = {
                    status: true,
                    message: "Music liked successfully",
                };
            }
            await Music.updateOne({
                id: musicId,
            }).set({
                likeCount: likeCount,
            });
            await User.publish([musicId], likePublishResponse);

            return exits.success(responseMessage);
        } catch (error) {
            return exits.invalid({
                status: false,
                message: serverErrorMsg,
            });
        }
    },
};
