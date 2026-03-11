const FCM = require("../../services/firebase/fcm");

module.exports = {
    friendlyName: "Get friends",

    description: "",

    inputs: {
        title: {
            type: "string",
        },
        body: {
            type: "string",
        },
        additionalData: {
            type: "ref",
        },
        deviceToken: {
            type: "ref",
            required: true,
        },
    },

    exits: {
        success: {},
    },

    fn: async function (inputs, exits) {
        const { title, body, additionalData, deviceToken } = inputs;
        var message = {
            notification: {
                title: title,
                body: body,
            },

            data: additionalData,
        };
        FCM.sendToMultipleToken(message, deviceToken, function (err, response) {
            if (err) {
                console.log("err :>> ", err);
                return exits.success(true);
            }
        });
        return exits.success(true);
    },
};
