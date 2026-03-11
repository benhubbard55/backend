module.exports = {
    inputs: {},

    fn: async function (inputs, exits) {
        let result = await sails.helpers.datatable.with({
            model: TransactionHistory,
            options: this.req.query,
            extraWhere: [
                {
                    transferType: "sellMusic",
                },
            ],
        });
        return exits.success(result);
    },
};
