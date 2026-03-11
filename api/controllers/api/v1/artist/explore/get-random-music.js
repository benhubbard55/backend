module.exports = {
    inputs: {},
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
        notFound: sails.config.globals.statusCodes.notFound,
    },
    fn: async function (inputs, exits) {
        try {
            const loginUserData = this.req.loggedInUser;
            const randomSort = await sails.helpers.generateRandomOrder();
            const result = await sails.helpers.getPaginationList.with({
                request: this.req,
                modelName: "Music",
                whereCondition: { userId: loginUserData?.id },
                sortBy: randomSort,
                populate: ["userId"],
            });

            return exits.success(result);
        } catch (error) {
            return exits.invalid({
                status: false,
                message: serverErrorMsg,
                error: error,
            });
        }
    },
};
