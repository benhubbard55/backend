module.exports = {
    friendlyName: 'View Users',
    description: 'Display block user list.',
    inputs: {

    },

    fn: async function (inputs, exits) {
        let result = await sails.helpers.datatable.with({
            model: BlockUser,
            options: this.req.query,
            extraWhere: [],
        });
        return exits.success(result);
    }
};