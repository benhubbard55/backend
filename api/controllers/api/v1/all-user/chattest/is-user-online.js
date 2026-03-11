var _ = require("lodash");
module.exports = {
    friendlyName: "Subscribe user",
    description: "",
    inputs: {
        userId: {
            type: "number",
            required: true,
        },
    },
    exits: {
        normalError: sails.config.globals.statusCodes.normalError,
    },

    fn: async function (inputs, exits) {
        var isUserOnline = await sails.helpers.socket.isSocketConnected(
            inputs.userId
        );

        return exits.success({
            status: true,
            message: "subscribe the user successfully",
            data: {
                isUserOnline: isUserOnline,
            },
        });
    },
};
