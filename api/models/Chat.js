
module.exports = {
    tableName: "chats",
    fetchRecordsOnUpdate: true,
    fetchRecordsOnCreate: true,
    fetchRecordsOnDestroy: true,
    attributes: {
        senderId: {
            model: 'User',
            required: true,
        },
        receiverId: {
            model: 'User',
            required: false,
        },
        secretId: {
            type: 'string',
            allowNull: true
        },
        chatGroupId: {
            model: 'ChatGroup',
            required: false
        },
        message: {
            type: 'string',
            allowNull: true,
            columnType: 'mediumtext',
        },
        messageData: {
            type: 'string',
            required: false,
            description: 'used to store the media pathe'
        },
        messageMediaType: {
            type: 'string',
            defaultsTo: 'text',
            isIn: ['text', 'video', 'audio', 'image', 'contact', 'location']
        },
        type: {
            type: 'string',
            isIn: ['direct', 'group', 'action'],
            defaultsTo: 'direct'
        },
        mediaSize: {
            type: 'string',
            allowNull: true,
        },
        vedioThumbnail: {
            type: 'string',
            required: false,
            allowNull: true,
            description: 'used to store the vedio thumbnail'
        },
        mediaProperty: {
            type: 'string',
            required: false,
            allowNull: true
        },
        groupMessageStatusDetail: {
            collection: 'GroupMessageStatus',
            via: 'messageId'
        },
    },

    customToJSON: function () {
        // if (this.messageData) {
        //     this.messageData = sails.config.userurl.imageUrl + 'chat/images/' + this.messageData;
        // }
        if (this.messageMediaType == 'image' && this.messageData) {
            this.imageMediaUrl = sails.config.custom.imageRetrieveUrl + sails.config.custom.PATH.USER_CHAT_MEDIA_PATH + '/image/' + this.senderId + '/' + this.messageData;
        } else {
            this.imageMediaUrl = null;
        }

        if (this.messageMediaType == 'video' && this.messageData) {
            this.videoMediaUrl = sails.config.custom.imageRetrieveUrl + sails.config.custom.PATH.USER_CHAT_MEDIA_PATH + '/video/' + this.senderId + '/' + this.messageData;

            this.vedioThumbnailUrl = this.vedioThumbnail ? (sails.config.custom.imageRetrieveUrl + sails.config.custom.PATH.USER_CHAT_MEDIA_PATH + '/vedioThumbnail/' + this.senderId + '/' + this.messageData) : null;
        } else {
            this.videoMediaUrl = null;
            this.vedioThumbnailUrl = null;
        }

        if (this.messageMediaType == 'audio' && this.messageData) {
            this.audioUrl = sails.config.custom.imageRetrieveUrl + sails.config.custom.PATH.USER_CHAT_MEDIA_PATH + '/audio/' + this.senderId + '/' + this.messageData;
        } else {
            this.audioUrl = null;
        }
        return _.omit(this, []);
    },

};

