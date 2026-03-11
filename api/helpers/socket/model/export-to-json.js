module.exports = {
    friendlyName: 'Export to json',
    description: '',
    inputs: {
        data: {
            type: 'ref',
            required: true
        }
    },
    exits: {
        success: {
            description: 'All done.',
        },
    },

    fn: async function (inputs, exits) {
        var stringifyData = JSON.stringify(inputs.data);
        var setData = JSON.parse(stringifyData);

        return exits.success(setData);
    }
};

