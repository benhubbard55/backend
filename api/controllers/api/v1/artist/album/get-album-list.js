module.exports = {
    inputs: {
        page: {
            type: "number",
            min: 0,
        },
        limit: {
            type: "number",
            min: 1,
        },
        userId: {
            type: "number",
            required: true,
        }
    },
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
    },
    fn: async function (inputs, exits) {
        const data = await sails.helpers.getPaginationList.with({
            request: this.req,
            modelName: "Album",
            whereCondition: { userId: inputs.userId },
            sortBy: "musicCount desc"
        });
        if (data.status) {
            return exits.success(data);
        } else {
            return exits.invalid(data);
        }
    },
};
