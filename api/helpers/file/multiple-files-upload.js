module.exports = {
    friendlyName: 'Multiple files upload',
    description: '',
    inputs: {
        req: {
            type: 'ref',
            description: 'The current incoming request (req).',
            required: true
        },
        filesToUpload: {
            type: 'ref',
            description: '',
            required: true
        },
    },
    exits: {

    },
    fn: async function (inputs, exits) {
        var req = inputs.req;
        var async = require('async');
        async.mapValues(inputs.filesToUpload, (file, key, cb) => {
            let dirname = (file.isTempImage ? sails.config.custom.tempImageUploadPath : sails.config.custom.imageUplaodPath) + file.PATH + "/";

            // var dirname = require('path').resolve(sails.config.appPath, file.PATH);
            // var RETRIEVE_PATH = file.RETRIEVE_PATH;
            req.file(key).upload({
                dirname: dirname,
                // maxBytes: Number.MAX_VALUE
                maxBytes: 500000000, //500 MB
                maxTimeToBuffer: 7200000, // 2 hours
            }, async (error, uploadedFile) => {
                var uploadedFileTemp = [];
                if (uploadedFile && Array.isArray(uploadedFile) && uploadedFile.length > 0) {
                    for (var i = 0; i < uploadedFile.length; i++) {
                        if (!uploadedFile[i] || typeof uploadedFile[i] === 'undefined') {
                            continue;
                        }
                        var uploadedFileName = uploadedFile[i].fd.split('/').pop().split('#')[0].split('?')[0];
                        var validImageTypes = ['image/jpeg', 'image/png'];
                        var inValidImageTypesArray = validImageTypes.indexOf(uploadedFile[i].type);
                        if (inValidImageTypesArray >= 0) {
                            await sails.helpers.file.resizeFile(uploadedFile[i].fd);
                        }

                        if (uploadedFile.length > 1) {
                            return exits.success({
                                status: false,
                                message: sails.__('Only one file will be uploaded at one place'),
                                error: null,
                                uploadedFiles: uploadedFileTemp
                            });
                        }

                        // uploadedFile[i].uploadFileName = RETRIEVE_PATH + uploadedFileName;
                        uploadedFile[i].uploadFileName = uploadedFileName;
                        uploadedFileTemp.push(uploadedFile[i]);
                    }
                }
                return cb(error, uploadedFileTemp);
            });
        }, function doneUploading(errLast, filesLast) {
            var returnObj = {
                status: true,
                message: '',
                uploadedFiles: filesLast,
            };
            if (errLast) {
                returnObj.status = false;
                returnObj.message = errLast.message;
            }
            return exits.success(returnObj);
        });
    }
};
