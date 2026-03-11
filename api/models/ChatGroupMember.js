var moment = require("moment");
module.exports = {
    tableName: "chatGroupMembers",
    fetchRecordsOnUpdate: true,
    fetchRecordsOnCreate: true,
    fetchRecordsOnDestroy: true,
    attributes: {
        chatGroupId: {
            model: 'ChatGroup',
            required: false
        },
        memberId: {
            model: 'User',
            required: true
        },
        isDeleted: {
            type: 'boolean',
            defaultsTo: false,
        },
        removeFromGroupTime: {
            type: 'ref',
            columnType: 'time',
            defaultsTo: moment.utc().format('HH:mm:ss'),
            required: false
        },
        removeFromGroupDate: {
            type: 'ref',
            columnType: 'date',
            defaultsTo: moment.utc().format('YYYY-MM-DD'),
            required: false
        }
    },
};

