module.exports = {
    friendlyName: 'View Users',
    description: 'Display users.',
    inputs: {

    },

    fn: async function (inputs, exits) {
        let result = await sails.helpers.datatable.with({
            model: Music,
            options: this.req.query
        });
        return exits.success(result);
    }
};