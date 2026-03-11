module.exports = {
    friendlyName: "Follower list",
    inputs: {},
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
    },
    fn: async function (inputs, exits) {
        const loginUserData = this.req.loggedInUser;

        const data = await sails.helpers.getPaginationList.with({
            request: this.req,
            modelName: "Follower",
            whereCondition: { followedBy: loginUserData?.id },
            populate: ["followedTo"],
        });

        if (data.status) {
            return exits.success(data);
        } else {
            return exits.invalid(data);
        }
    },
};
