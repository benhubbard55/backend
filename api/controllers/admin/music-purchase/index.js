module.exports = {
    friendlyName: 'View Users',
    description: 'Display users.',
    inputs: {

    },

    fn: async function (inputs, exits) {
        let result = await sails.helpers.datatable.with({
            model: TransactionHistory,
            options: this.req.query,
            extraWhere: [{
                transferType: "buyMusic"
            }]
        });
        return exits.success(result);
    }
};