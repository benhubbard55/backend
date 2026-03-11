module.exports = {
    friendlyName: "Get Music",
    inputs: {
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
        const loginUserData = this.req.loggedInUser;
        const data = await sails.helpers.getPaginationList.with({
            request: this.req,
            modelName: "Music",
            whereCondition: { userId: inputs?.userId, isDeleted: false },
        });

        if (data.status) {
            return exits.success(data);
        } else {
            return exits.invalid(data);
        }
    },
};
