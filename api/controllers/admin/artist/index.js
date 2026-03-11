module.exports = {
    friendlyName: "View Users",
    description: "Display users.",
    inputs: {},

    fn: async function (inputs, exits) {
        let result = await sails.helpers.datatable.with({
            model: User,
            options: this.req.query,
            extraWhere: [
                {
                    userType: 2,
                },
            ],
        });
        return exits.success(result);
    },
};
