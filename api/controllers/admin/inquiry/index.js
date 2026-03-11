module.exports = {
    inputs: {},

    fn: async function (inputs, exits) {
        let result = await sails.helpers.datatable.with({
            model: Inquiry,
            options: this.req.query,
        });
        return exits.success(result);
    },
};
