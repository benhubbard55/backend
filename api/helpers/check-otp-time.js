/* eslint-disable eqeqeq */
module.exports = {
    friendlyName: "Create account",
    description: "",
    inputs: {
        endTime: {
            type: "ref",
            required: false,
            defaultsTo: "2024-08-06 07:21:57",
        },
    },

    exits: {
        success: {},
        invalid: {},
        badRequest: {},
    },

    fn: async function (inputs, exits) {
        let isValid = false;

        var currentFormatTime = moment(inputs.endTime).format(
            "YYYY-MM-DD HH:mm:ss"
        );
        var currentCheckTime = moment(currentFormatTime);

        var endFormateTime = moment().utc().format("YYYY-MM-DD HH:mm:ss");
        var endCheckTime = moment(endFormateTime);

        var duration = moment.duration(endCheckTime.diff(currentCheckTime));
        const validity = (await sails.config.custom.OTP.validty) || 10;

        if (duration.asMinutes() <= validity) {
            isValid = true;
        }
        return exits.success(isValid);
    },
};
