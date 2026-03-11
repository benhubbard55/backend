module.exports = {
    friendlyName: 'View Users',
    description: 'Display users.',
    inputs: {

    },

    fn: async function (inputs, exits) {
        const userId = this.req.params["userId"]

        let result = await sails.helpers.datatable.with({
            model: Music,
            options: this.req.query,
            extraWhere: [{
                userId: userId
            }]
        });
        return exits.success(result);
    }
};