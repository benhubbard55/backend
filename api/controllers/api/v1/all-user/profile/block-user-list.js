module.exports = {
    friendlyName: "block user list",
    inputs: {},
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
    },
    fn: async function (inputs, exits) {
        const loginUserData = this.req.loggedInUser;
        const data = await sails.helpers.getPaginationList.with({
            request: this.req,
            modelName: "BlockUser",
            whereCondition: { blockBy: loginUserData?.id },
            populate: ["blockTo"],
        });

        if (data.status) {
            return exits.success(data);
        } else {
            return exits.invalid(data);
        }
    },
};
