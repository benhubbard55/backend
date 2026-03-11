module.exports = {
    friendlyName: 'Single file upload',
    description: '',
    inputs: {
        req: {
            type: 'ref',
            description: 'The current incoming request (req).',
            required: true
        },
        path: {
            type: "string",
            required: true,
        },
        filename: {
            type: 'string',
            required: true
        }
    },
    exits: {

    },
    fn: async function (inputs, exits) {
        var req = inputs.req;
        var fs = require("fs");
        var filesToUpload = req.file(inputs.filename);


        // if (!fs.existsSync(dirPath)) {
        //     fs.mkdirSync(dirPath, {
        //         recursive: true,
        //     });
        // }

        filesToUpload.upload({
            dirname: require("path").resolve(sails.config.appPath, inputs.path),
            // maxBytes: Number.MAX_VALUE
            maxBytes: 500000000, //500 MB
            maxTimeToBuffer: 7200000, // 2 hours
        }, async (error, uploadedFile) => {
            if (error) {
                return exits.success({
                    status: false,
                    message: error.message,
                    error: error
                });
            } else {
                var uploadedFileTemp = [];
                if (uploadedFile && Array.isArray(uploadedFile) && uploadedFile.length > 0) {
                    for (var i = 0; i < uploadedFile.length; i++) {
                        if (!uploadedFile[i] || typeof uploadedFile[i] === 'undefined') {
                            continue;
                        }
                        var uploadedFileName = uploadedFile[i].fd.split('/').pop().split('#')[0].split('?')[0];
                        var validImageTypes = ['video/mp4', 'video/mpeg', 'video/mpg'];
                        var inValidImageTypesArray = validImageTypes.indexOf(uploadedFile[i].type);
                        if (inValidImageTypesArray < 0) {
                            return exits.success({
                                status: false,
                                message: sails.__('Allows only MP4 and MPEG')
                            });
                        }

                        uploadedFile[i].uploadFileName = uploadedFileName;
                        uploadedFileTemp.push(uploadedFile[i]);
                    }
                }

                if (uploadedFileTemp.length === 0) {
                    return exits.success({
                        status: false,
                        message: sails.__('File is required'),
                        error: null,
                        uploadedFiles: uploadedFileTemp
                    });
                }

                return exits.success({
                    status: true,
                    message: '',
                    uploadedFiles: uploadedFileTemp
                });
            }
        });
    }
};
