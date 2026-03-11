module.exports = {
    friendlyName: "Delete",
    description: "Delete User.",
    inputs: {},
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
    },

    fn: async function (inputs, exits) {
        const result = await sails.helpers.userStatus(this.req);
        if (result) {
            return exits.success({
                message: result.message,
            });
        } else {
            return exits.invalid({
                message: result.message,
            });
        }
    },
};
