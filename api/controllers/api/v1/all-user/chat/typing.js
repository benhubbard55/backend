module.exports = {
    friendlyName: "Is user type",
    description: "",
    inputs: {
        receiverId: {
            type: "number",
            required: true,
            min: 1,
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

        var senderData = await User.findOne({
            where: { id: req.loggedInUser.id },
            select: ["id", "name", "email"],
        });

        var sendData = {
            action: "userTyping",
            data: {
                senderData: senderData,
            },
            message: sails.__("%s is typing.....", senderData.name),
        };

        User.publish([inputs.receiverId], sendData);

        return exits.success({
            status: true,
            message: sails.__("Send typing action successfully"),
        });
    },
};
