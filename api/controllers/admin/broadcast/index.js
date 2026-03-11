module.exports = {
    friendlyName: 'View Users',
    description: 'Display BroadCast.',
    inputs: {

    },

    fn: async function (inputs, exits) {
        let result = await sails.helpers.datatable.with({
            model: BroadCast,
            options: this.req.query
        });
        return exits.success(result);
    }
};