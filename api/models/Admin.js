
module.exports = {
    tableName: "admins",
    fetchRecordsOnCreate: true,
    fetchRecordsOnUpdate: true,
    fetchRecordsOnDestroy: true,
    attributes: {
        firstName: {
            type: "string",
            required: true,
        },

        lastName: {
            type: "string",
            required: true,
        },
        email: {
            type: "string",
            required: true,
            unique: true,
            isEmail: true,
        },
        password: {
            type: "string",
            required: true,
            protect: true,
        },
    },
};
