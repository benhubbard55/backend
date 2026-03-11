module.exports = {
    friendlyName: "View Users",

    description: "Display users.",

    inputs: {},

    //   exits: {
    //     success: {
    //     }
    //   },

    fn: async function (inputs, exits) {
        // let result = await sails.helpers.datatable(Project, this.req.query);
        let result = await sails.helpers.datatable.with({
            model: User,
            options: this.req.query,
        });
        return exits.success(result);
    },
};
