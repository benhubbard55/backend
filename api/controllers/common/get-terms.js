module.exports = {
    friendlyName: 'Get policy',
    description: '',
    inputs: {
    },
    exits: {
        success: sails.config.globals.statusCodes.success,
    },

    fn: async function (inputs, exits) {
        var termsData = await Terms.find()

        return exits.success({
            message: 'Fetch the data successfully',
            data: termsData[0]
        });
    }
};