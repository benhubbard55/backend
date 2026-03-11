module.exports = {
    tableName: "transactionHistories",
    fetchRecordsOnCreate: true,
    fetchRecordsOnUpdate: true,
    fetchRecordsOnDestroy: true,
    attributes: {
        userId: {
            model: "User",
        },
        buyMusicId: {
            model: "BuyMusic",
        },
        amount: {
            type: "number",
            defaultsTo: 0,
        },
        tax: {
            type: "number",
            defaultsTo: 0,
        },
        totalAmount: {
            type: "number",
            defaultsTo: 0,
        },
        type: {
            type: "string",
            allowNull: true,
        },
        transferType: {
            type: "string",
            isIn: ["sellMusic", "buyMusic", "withdraw"],
            allowNull: true,
        },
        transactionId: {
            type: "string",
            allowNull: true,
        },
        receiverId: {
            model: "User",
        },
        musicId: {
            model: "Music",
        },
        status: {
            type: "string",
            allowNull: true,
            isIn: ["success", "pending", "failed"]
        }
    },
};
