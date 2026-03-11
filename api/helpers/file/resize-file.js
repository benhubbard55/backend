module.exports = {
    friendlyName: 'Resize file',
    description: '',
    inputs: {
        fileName: {
            type: 'string',
            description: ' provides the name of file to resize',
        }
    },
    exits: {

    },
    fn: async function (inputs, exits) {
        var fs = require('fs');
        var gm = require('gm');

        if (fs.existsSync(inputs.fileName)) {
            gm(inputs.fileName)
                // .resize(500, 500, '!')
                // .resize(500, 500)
                .resize(800, 800, '>')
                .write(inputs.fileName, (err) => {
                    if (err) {
                        console.log('Resize file Err: ', err);
                        return exits.success({
                            status: false,
                            message: err.message
                        });
                    }
                    return exits.success({
                        status: true
                    });
                });
        } else {
            return exits.success({
                status: true
            });
        }
    }
};
