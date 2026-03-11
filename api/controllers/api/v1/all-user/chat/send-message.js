module.exports = {
    friendlyName: "Chat",
    description: "Chat something.",
    inputs: {
        receiverId: {
            type: "number",
            required: true,
        },
        message: {
            type: "string",
            columnType: "mediumtext",
            allowNull: true,
        },
        messageMediaType: {
            type: "string",
            defaultsTo: "text",
            isIn: ["text", "image"],
        },
    },
    exits: {
        normalError: sails.config.globals.statusCodes.normalError,
        formValidation: sails.config.globals.statusCodes.badRequest,
    },
    fn: async function (inputs, exits) {
        try {
            var req = this.req;
            var receiverDetail = await User.findOne({
                id: inputs.receiverId,
            });

            if (!receiverDetail || receiverDetail?.id == req.loggedInUser.id) {
                return exits.formValidation({
                    status: false,
                    message: sails.__("Invalid receiver Id"),
                });
            }

            inputs.receiverId = receiverDetail?.id;
            var messageData = "";
            var mediaSize = null;
            var vedioThumbnail = null;

            if (inputs.messageMediaType !== "text") {
                var fileUploadResponse = await handleFileUpload(
                    req,
                    req.loggedInUser.id
                );

                if (fileUploadResponse.status === false) {
                    return exits.normalError({
                        status: false,
                        message: fileUploadResponse.message,
                    });
                }

                if (inputs.messageMediaType === "image") {
                    if (fileUploadResponse?.image?.length == 0) {
                        return exits.normalError({
                            status: false,
                            message: "Image is required",
                        });
                    }
                    messageData = fileUploadResponse.image[0].uploadFileName;
                    mediaSize = fileUploadResponse.image[0].size;
                    inputs.message = "Photos";
                } else if (inputs.messageMediaType === "video") {
                    if (fileUploadResponse.video.length == 0) {
                        return exits.normalError({
                            status: false,
                            message: "Video is required",
                        });
                    }
                    messageData = fileUploadResponse.video[0].uploadFileName;
                    mediaSize = fileUploadResponse.video[0].size;
                    inputs.message = "Video";

                    if (
                        fileUploadResponse.videothumbnail &&
                        fileUploadResponse.videothumbnail?.length
                    ) {
                        vedioThumbnail =
                            fileUploadResponse.videothumbnail[0].uploadFileName;
                    }
                } else if (inputs.messageMediaType === "audio") {
                    if (fileUploadResponse.audio.length == 0) {
                        return exits.normalError({
                            status: false,
                            message: "Audio is required",
                        });
                    }
                    messageData = fileUploadResponse.audio[0].uploadFileName;
                    mediaSize = fileUploadResponse.audio[0].size;
                    inputs.message = "Audio";
                }
            }

            var isChatGroupExist = await isChatGroupExistCheck(
                req.loggedInUser.id,
                inputs.receiverId
            );
            let secretId = await sails.helpers.codeGenerator();
            var chatData = {
                senderId: req.loggedInUser.id,
                receiverId: inputs.receiverId,
                message: inputs.message,
                chatGroupId: isChatGroupExist,
                messageMediaType: inputs.messageMediaType,
                messageData: messageData,
                secretId: secretId,
                mediaSize: mediaSize,
                vedioThumbnail: vedioThumbnail,
            };

            let createdChat = await Chat.create(chatData);
            createdChat = await Chat.findOne({ id: createdChat?.id });
            createdChat = await sails.helpers.socket.model.exportToJson(createdChat);

            await ChatGroup.update({ id: isChatGroupExist }).set({
                lastMsgId: createdChat?.id,
            });

            receiverDetail = await sails.helpers.socket.model.exportToJson(
                receiverDetail
            );
            createdChat.receiverImage = receiverDetail.defaultImageUrl;
            createdChat.receiverName = receiverDetail.name;
            createdChat.receiverSecretId = receiverDetail.secretId;

            createdChat.isDeleted = receiverDetail.isDeleted;
            createdChat.isUserOnline = receiverDetail.isUserOnline;
            var sendData = {
                action: "sendMessage",
                data: {
                    chatMessage: createdChat,
                },
                message: sails.__("publish message successfully"),
            };

            User.publish([inputs.receiverId, req.loggedInUser.id], sendData, req);

            if (!(await sails.helpers.socket.isSocketConnected(inputs.receiverId))) {
                await sails.helpers.addNotification.with({
                    senderId: req.loggedInUser.id,
                    receiverId: inputs?.receiverId,
                    notificationType: "chat",
                    redirectId: createdChat?.id,
                    title: `${req.loggedInUser.name}`,
                    description: `${req.loggedInUser.name} send you a ${inputs.messageMediaType == "image" ? "photo" : "message"
                        }`,
                });
            }

            await maintainMessageStatus(
                req.loggedInUser.id,
                receiverDetail?.id,
                createdChat?.chatGroupId,
                createdChat?.id
            );
            await opponentUserUnreadCount(receiverDetail?.id);

            return exits.success({
                status: true,
                message: sails.__("send message successfully"),
                data: {
                    chatMessage: createdChat,
                },
            });
        } catch (error) {
            return exits.normalError({
                status: false,
                message: "Something went wrong",
                error,
            });
        }
    },
};

async function opponentUserUnreadCount(receiverId) {
    var getUnreadCountQuery = `SELECT gms.groupId AS unreadCount, COUNT(gms.id) AS unreadCount FROM groupMessageStatus AS gms 
    WHERE gms.receiverId=$1 AND status IN('sent','deliver') 
    GROUP BY gms.groupId`;

    const getUnreadCountQueryValues = [receiverId];
    var getUnreadCountData = await sails.sendNativeQuery(
        getUnreadCountQuery,
        getUnreadCountQueryValues
    );
    getUnreadCountData = getUnreadCountData.rows;

    let sendData = {
        action: "unreadBadgeCount",
        data: {
            unreadBadgeCount: getUnreadCountData.length,
        },
        message: sails.__("Get unread badge count successfully"),
    };
    User.publish([receiverId], sendData);

    return;
}

async function maintainMessageStatus(
    loggedInUserId,
    receiverId,
    chatGroupId,
    messageId
) {
    var messageStatusDataForLoggedInUser = {
        messageId: messageId,
        groupId: chatGroupId,
        receiverId: loggedInUserId,
        status: "read",
    };

    var messageStatusDataForReceiverUser = {
        messageId: messageId,
        groupId: chatGroupId,
        receiverId: receiverId,
    };

    let isGroupSocketConnected =
        await sails.helpers.socket.isGroupSocketConnected(receiverId, chatGroupId);
    if (isGroupSocketConnected.status) {
        messageStatusDataForReceiverUser.status = "read";
    } else {
        if (await sails.helpers.socket.isSocketConnected(receiverId)) {
            messageStatusDataForReceiverUser.status = "deliver";
        } else {
            messageStatusDataForReceiverUser.status = "sent";
        }
    }

    var createData = [];
    createData.push(messageStatusDataForLoggedInUser);
    createData.push(messageStatusDataForReceiverUser);

    await GroupMessageStatus.createEach(createData);
    return;
}

async function handleFileUpload(req, userId) {
    try {
        // var upload = req.file(uploadField);

        var filesToUpload = {
            image: {
                PATH:
                    sails.config.custom.PATH.USER_CHAT_MEDIA_PATH +
                    "/" +
                    "image" +
                    "/" +
                    userId,
                isTempImage: false,
            },
            video: {
                PATH:
                    sails.config.custom.PATH.USER_CHAT_MEDIA_PATH +
                    "/" +
                    "video" +
                    "/" +
                    userId,
                isTempImage: false,
            },
            audio: {
                PATH:
                    sails.config.custom.PATH.USER_CHAT_MEDIA_PATH +
                    "/" +
                    "audio" +
                    "/" +
                    userId,
                isTempImage: false,
            },
            videothumbnail: {
                PATH:
                    sails.config.custom.PATH.USER_CHAT_MEDIA_PATH +
                    "/" +
                    "videothumbnail" +
                    "/" +
                    userId,
                isTempImage: false,
            },
        };

        var multipleFilesUploadResponse =
            await sails.helpers.file.multipleFilesUpload(req, filesToUpload);
        multipleFilesUploadResponse = multipleFilesUploadResponse?.uploadedFiles
            ? multipleFilesUploadResponse?.uploadedFiles
            : [];

        return multipleFilesUploadResponse;
    } catch (error) {
        console.log("error", error);
        return fileUploadFailedResponse();
    }
}

async function fileUploadFailedResponse() {
    return { status: false, message: "Error uploading file" };
}

async function isChatGroupExistCheck(senderId, receiverId) {
    var title = "senderId" + senderId + "receiverId" + receiverId;
    var isGroupCreated = await ChatGroup.find({
        or: [
            { creatorId: senderId, userId: receiverId },
            { creatorId: receiverId, userId: senderId },
        ],
    });

    let chatGroupId = isGroupCreated.length > 0 ? isGroupCreated[0]["id"] : null;
    if (isGroupCreated.length <= 0) {
        let secretId = await sails.helpers.codeGenerator();
        var createdChatGroup = await ChatGroup.create({
            creatorId: senderId,
            userId: receiverId,
            title: title,
            type: "direct",
            secretId: secretId,
        });
        chatGroupId = createdChatGroup?.id;
    }
    return chatGroupId;
}
