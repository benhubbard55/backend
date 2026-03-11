module.exports = {
    tableName: 'contacts',
    fetchRecordsOnUpdate: true,
    fetchRecordsOnDestroy: true,
    fetchRecordsOnCreate: true,
    attributes: {
        name: {
            type: 'string',
            required: true
        },
        email: {
            type: 'string',
            required: true,
        },
        contact: {
            type: 'string',
            required: true,
        },
        message: {
            type: 'string',
            required: true
        }
    },
};