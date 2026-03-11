module.exports = {
    tableName: "paymentSettings",
    fetchRecordsOnCreate: true,
    fetchRecordsOnUpdate: true,
    fetchRecordsOnDestroy: true,
    attributes: {
        tax: {
            type: "number",
            defaultsTo: 0
        },
        keyName: {
            type: "string",
            allowNull: true
        }
    },
};
