module.exports = {
    tableName: "inquiries",
    fetchRecordsOnCreate: true,
    fetchRecordsOnUpdate: true,
    fetchRecordsOnDestroy: true,
    attributes: {
        name: {
            type: "string",
            allowNull: true,
        },
        email: {
            type: "string",
            allowNull: true,
        },
        phoneNo: {
            type: "string",
            allowNull: true,
        },
        message: {
            type: "string",
            allowNull: true,
        }
    },
};
