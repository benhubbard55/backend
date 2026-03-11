module.exports = {
    tableName: "notification",
    fetchRecordsOnCreate: true,
    fetchRecordsOnUpdate: true,
    fetchRecordsOnDestroy: true,
    attributes: {
        senderId: {
            model: "User",
        },
        receiverId: {
            model: "User",
        },
        isRead: {
            type: "boolean",
            defaultsTo: false,
        },
        notificationType: {
            type: "string",
            // isIn: [],
            allowNull: true,
        },
        redirectId: {
            type: "number",
            allowNull: true,
        },
        title: {
            type: "string",
            allowNull: true,
        },
        description: {
            type: "string",
            allowNull: true,
        },
        isFromAdmin: {
            type: "boolean",
            defaultsTo: false,
        },
        showTo: {
            type: "string",
            isIn: ["users", "artists", "allUsers"],
            defaultsTo: "users",
            allowNull: true
        },
    },
};
