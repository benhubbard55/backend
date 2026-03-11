module.exports = {
    friendlyName: 'Uuid generator',
    description: '',
    inputs: {
        stringType: {
            type: 'string',
            isIn: ['secretId', 'fourDigitOTP'],
            defaultsTo: 'secretId'
        }
    },
    exits: {
        success: {
            description: 'All done.',
        },
    },

    fn: async function (inputs) {
        const { UniqueOTP, uuid } = require('unique-string-generator');
        if (inputs.stringType == 'fourDigitOTP') {
            return UniqueOTP(4);
        } else {
            return uuid.v4();
        }
    }
};

