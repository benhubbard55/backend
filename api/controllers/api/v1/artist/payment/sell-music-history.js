module.exports = {
    inputs: {},
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
    },
    fn: async function (inputs, exits) {
        const loginUserData = this.req.loggedInUser;

        const data = await sails.helpers.getPaginationList.with({
            request: this.req,
            modelName: "TransactionHistory",
            whereCondition: {
                receiverId: loginUserData.id,
                status: { in: ["success", "pending"] },
                transferType: { in: ["sellMusic", "withdraw"] },
            },
            sortBy: "id desc",
            populate: ["userId"],
        });

        if (data.status) {
            return exits.success(data);
        } else {
            return exits.invalid(data);
        }
    },
};
