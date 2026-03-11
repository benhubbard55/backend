
module.exports = {
    tableName: 'groupMessageStatus',
    fetchRecordsOnUpdate: true,
    fetchRecordsOnDestroy: true,
    fetchRecordsOnCreate: true,
    attributes: {
        receiverId: {
            model: 'User',
            required: true
        },
        groupId: {
            model: 'ChatGroup',
            required: true
        },
        messageId: {
            model: 'Chat',
            required: true
        },
        status: {
            type: 'string',
            isIn: ['sent', 'deliver', 'read'],
            required: true
        },
    },
};

