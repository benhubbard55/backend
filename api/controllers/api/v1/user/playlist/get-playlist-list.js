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
    },
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
    },
    fn: async function (inputs, exits) {
        const loginUserData = this.req.loggedInUser;

        const data = await sails.helpers.getPaginationList.with({
            request: this.req,
            modelName: "Playlist",
            whereCondition: { userId: loginUserData?.id },
        });
        if (data.status) {
            return exits.success(data);
        } else {
            return exits.invalid(data);
        }
    },
};
