/* eslint-disable eqeqeq */
module.exports = {
    friendlyName: "Create account",
    description: "",
    inputs: {
        field: {
            type: "ref",
        },
    },

    exits: {
        success: {},
        invalid: {},
        badRequest: {},
    },

    fn: async function (inputs, exits) {
        var countryCode = inputs.field;
        countryCode = countryCode.trim();

        var countryFirstChar = countryCode.charAt(0);

        if (countryFirstChar !== "+") {
            countryCode = "+" + countryCode;
        }
        return exits.success(countryCode);
    },
};
