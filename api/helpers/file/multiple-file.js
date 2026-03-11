const path = require('path');
const fs = require('fs');
// const { ChildProcess } = require('child_process');
// const gm = require('gm').subClass({ imageMagick: true });
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
                var thumbPath;

                if (file?.thumbPath) {
                    thumbPath = file.thumbPath;
                }

                var uploadedFileTemp = [];

                req.file(key).upload(
                    {
                        dirname: require('path').resolve(sails.config.appPath, `${path}`),
                        maxBytes: 10737418240
                    },
                    async function whenDone(error, uploadedFile) {
                        if (uploadedFile && Array.isArray(uploadedFile) && uploadedFile?.length > 0) {
                            for (var i = 0; i < uploadedFile.length; i++) {
                                if (!uploadedFile[i] || typeof uploadedFile[i] === 'undefined' || uploadedFile[i].status !== 'finished') {
                                    continue;
                                }
                                var uploadedFileName = uploadedFile[i].fd.split('/').pop().split('#')[0].split('?')[0];

                                // var upload = gm(require('path').join(process.cwd(), 'assets', 'images', `${path}`, `${uploadedFileName}`));

                                // if(thumbPath){
                                // 	let createThumb = require('path').join(process.cwd(), 'assets', 'images', `${thumbPath}`);

                                // 	// Check if folder exists, create it if it doesn't
                                // 	if (!fs.existsSync(createThumb)) {
                                // 		fs.mkdirSync(createThumb);
                                // 	}
                                // 	upload.thumbnail(450, 450).write(require('path')?.join(process.cwd(), 'assets', 'images', `${thumbPath}`, `${uploadedFileName}`), async (err) => {
                                // 		if (err) {
                                // 			console.log(err, 'errrrrrrrrrrrrrrrrrrrrrrrr');
                                // 			return err.message;
                                // 		}
                                // 	});
                                // }

                                var ext = uploadedFileName.split('.').pop();

                                uploadedFile[i].uploadFileName = uploadedFileName;
                                uploadedFileTemp.push(uploadedFile[i]);
                            }
                        }
                        console.log("eror123", error);

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
                    console.log("error", errLast);
                    returnObj.status = false;
                    returnObj.message = errLast.message;
                }
                return exits.success(returnObj);
            }
        );
    },
};
