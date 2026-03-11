module.exports = {
    friendlyName: "Follow",
    inputs: {
        artistId: {
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
            const { artistId } = inputs;

            const findArtist = await User.findOne({
                id: artistId,
                isDeleted: false,
            });

            if (!findArtist) {
                return exits.notFound({
                    status: false,
                    message: "Artist not found",
                });
            }

            let responseMessage,
                followPublishData,
                followCount = findArtist?.followCount || 0,
                followingCount = loginUserData?.followingCount || 0;

            console.log("followingCount", followingCount)

            const findFollowedArtist = await Follower.findOne({
                followedBy: loginUserData?.id,
                followedTo: artistId,
            });

            if (findFollowedArtist) {
                await Follower.destroy({
                    followedBy: loginUserData?.id,
                    followedTo: artistId,
                });
                if (followCount > 0) {
                    followCount -= 1;
                }
                if (followingCount > 0) {
                    followingCount -= 1;
                }

                await Notification.destroy({
                    senderId: loginUserData.id,
                    receiverId: artistId,
                    notificationType: "followArtist",
                });

                followPublishData = {
                    action: "unfollowArtist",
                    data: {
                        userData: loginUserData,
                    },
                    message: `${loginUserData?.name} un-follow you`,
                };
                responseMessage = {
                    status: true,
                    message: "User un-follow successfully",
                };
            } else {
                await Follower.create({
                    followedBy: loginUserData?.id,
                    followedTo: artistId,
                });

                if (artistId !== loginUserData?.id) {
                    await sails.helpers.addNotification.with({
                        senderId: loginUserData.id,
                        receiverId: artistId,
                        notificationType: "followArtist",
                        redirectId: artistId,
                        title: "User Follow",
                        description: `${loginUserData?.name} started to following you`,
                    });
                }
                followCount += 1;
                followingCount += 1;

                followPublishData = {
                    action: "followArtist",
                    data: {
                        userData: loginUserData,
                    },
                    message: `${loginUserData?.name} started to follow you`,
                };

                responseMessage = {
                    status: true,
                    message: "User follow successfully",
                };
            }
            await User.updateOne({
                id: findArtist?.id,
            }).set({
                followCount: followCount,
            });
            await User.updateOne({
                id: loginUserData?.id,
            }).set({
                followingCount: followingCount,
            });

            await User.publish([artistId], followPublishData);

            return exits.success(responseMessage);
        } catch (error) {
            return exits.invalid({
                status: false,
                message: serverErrorMsg,
            });
        }
    },
};
