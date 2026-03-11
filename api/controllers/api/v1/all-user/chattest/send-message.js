module.exports = {
    friendlyName: "Chat",
    description: "Chat something.",
    inputs: {
        receiverId: {
            type: "string",
            required: true,
        },
        message: {
            type: "string",
            columnType: "mediumtext",
            allowNull: true,
        },
    },
    exits: {
        normalError: sails.config.globals.statusCodes.normalError,
        formValidation: sails.config.globals.statusCodes.badRequest,
    },
    fn: async function (inputs, exits) {
        var req = this.req;
        var sendData = {
            action: "sendMessage",
            data: {
                message: inputs.message,
            },
            message: sails.__("publish message successfully"),
        };

        User.publish([inputs.receiverId], sendData, req);

        return exits.success({
            status: true,
            message: sails.__("send message successfully"),
            isOpponentUserOffline: await sails.helpers.socket.isSocketConnected(
                inputs.receiverId
            ),
            data: {
                message: inputs.message,
            },
        });
    },
};
