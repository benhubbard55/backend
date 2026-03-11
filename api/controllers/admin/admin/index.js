module.exports = {
    friendlyName: "View Admins",
    description: "Display admins.",
    inputs: {},

    fn: async function (inputs, exits) {
        let result = await sails.helpers.datatable.with({
            model: Admin,
            options: this.req.query,
        });
        return exits.success(result);
    },
};
