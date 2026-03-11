module.exports = {
    friendlyName: 'View Users',
    description: 'Display users.',
    inputs: {

    },

    fn: async function (inputs, exits) {
        const artistId = this.req.params["artistId"]

        let result = await sails.helpers.datatable.with({
            model: Music,
            options: this.req.query,
            extraWhere: [{
                userId: artistId
            }]
        });
        return exits.success(result);
    }
};