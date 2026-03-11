const path = require('path');
const fs = require('fs');
const gm = require('gm').subClass({ imageMagick: true });
module.exports = {
    friendlyName: 'Multiple files upload',
    description: '',
    inputs: {
        req: {
            type: 'ref',
            description: 'The current incoming request (req).',
            required: true,
        },
        filesToUpload: {
            type: 'ref',
            description: '',
            required: true,
        },
        user: {
            type: 'ref',
            description: '',
            required: false,
        },
    },
    exits: {
        success: {
            status: 200,
        },
    },
    fn: async function (inputs, exits) {
        var async = require('async');
        var req = inputs.req;

        async.mapValues(
            inputs.filesToUpload,
            (file, key, cb) => {
                var path = file.path;
                console.log("path", path);
                var thumbPath;
                console.log("key", key);
                if (file?.thumbPath) {
                    thumbPath = file.thumbPath;
                }

                var uploadedFileTemp = [];

                req.file(key).upload(
                    {
                        dirname: require('path').resolve(sails.config.appPath, `${path}`),
                    },
                    async function whenDone(error, uploadedFile) {
                        console.log("uploadedFilefdfdsf", uploadedFile, error, uploadedFile && Array.isArray(uploadedFile) && uploadedFile?.length > 0);
                        if (uploadedFile && Array.isArray(uploadedFile) && uploadedFile?.length > 0) {
                            for (var i = 0; i < uploadedFile.length; i++) {
                                if (!uploadedFile[i] || typeof uploadedFile[i] === 'undefined' || uploadedFile[i].status !== 'finished') {
                                    continue;
                                }
                                var uploadedFileName = uploadedFile[i].fd.split('/').pop().split('#')[0].split('?')[0];
                                console.log("uploadedFileName", uploadedFileName);
                                var upload = gm(require('path').join(process.cwd(), 'assets', 'images', `${path}`, `${uploadedFileName}`));
                                console.log("upload", upload);

                                var ext = uploadedFileName.split('.').pop();

                                uploadedFile[i].uploadFileName = uploadedFileName;
                                uploadedFileTemp.push(uploadedFile[i]);
                            }
                        }
                        console.log("error", error);
                        console.log("uploadedFileTemp", uploadedFileTemp);
                        return cb(error, uploadedFileTemp);
                    }
                );
            },
            function doneUploading(errLast, filesLast) {
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
            }
        );
    },
};