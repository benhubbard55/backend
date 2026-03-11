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
        var req = this.req;
        if (!req.isSocket) {
            return exits.normalError({
                status: false,
                message: sails.__("Only Socket request allowed"),
            });
        }

        User.subscribe(req, [inputs.userId]);

        var userData = await User.update({ id: inputs.userId }).set({
            socketId: req.socket.id,
            isUserOnline: true,
        });
        sails.sockets.blast(
            "message",
            {
                action: "userIsOnline",
                data: {
                    userId: userData[0]["id"],
                    name: userData[0]["name"],
                },
                message: sails.__("User is Online"),
            },
            req
        );

        return exits.success({
            status: true,
            message: "subscribe the user successfully",
        });
    },
};
