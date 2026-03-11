module.exports = {
    friendlyName: "Property files upload",
    description: "",
    inputs: {
        req: {
            type: "ref",
            description: "The current incoming request (req).",
            required: true,
        },
        isupdate: {
            type: "boolean",
            required: false,
            defaultsTo: false,
        }
    },
    exits: {},
    fn: async function (inputs, exits) {
        var req = inputs.req;
        try {
            var async = require("async");
            const uploadArray = {
                musicProfile: "musicProfile",
                musicProfileVideo: "musicProfileVideo",
            };
            if (!inputs.isupdate) {
                uploadArray.musicFile = "musicFile"
            }

            console.log("uploadArray", uploadArray);
            async.mapValues(
                uploadArray,
                (file, key, cb) => {
                    var fs = require("fs");
                    var dirname = "";
                    var RETRIEVE_PATH = "";
                    console.log("file", file);
                    if (file === "musicProfile") {
                        dirname = require("path").resolve(
                            sails.config.appPath,
                            sails.config.globals.imagePath.MUSIC_PROFILE_IMAGE_STORE_PATH
                        );
                        RETRIEVE_PATH = "";
                    } else if (file === "musicFile") {
                        dirname = require("path").resolve(
                            sails.config.appPath,
                            sails.config.globals.imagePath.MUSIC_FILE_STORE_PATH
                        );
                        RETRIEVE_PATH = "";
                    }
                    else if (file === "musicProfileVideo") {
                        dirname = require("path").resolve(
                            sails.config.appPath,
                            sails.config.globals.imagePath.MUSIC_PROFILE_VIDEO_STORE_PATH
                        );
                        RETRIEVE_PATH = "";
                    }
                    req.file(file).upload(
                        {
                            dirname: dirname,
                            // maxBytes: Number.MAX_VALUE,
                            maxBytes: 8000000000,
                            maxTimeToBuffer: 72000000, // 2 hours
                        },
                        async (error, uploadedFile) => {
                            var uploadedFileTemp = [];
                            if (
                                uploadedFile &&
                                Array.isArray(uploadedFile) &&
                                uploadedFile.length > 0
                            ) {
                                for (var i = 0; i < uploadedFile.length; i++) {
                                    if (
                                        !uploadedFile[i] ||
                                        typeof uploadedFile[i] === "undefined"
                                    ) {
                                        continue;
                                    }
                                    if (
                                        !fs.existsSync(uploadedFile[i].fd) ||
                                        !fs.statSync(uploadedFile[i].fd).isFile()
                                    ) {
                                        continue;
                                    }

                                    var uploadedFileName = uploadedFile[i].fd
                                        .split("/")
                                        .pop()
                                        .split("#")[0]
                                        .split("?")[0];


                                    var fileExtension = getFileExtension(uploadedFile[i].fd);
                                    if (!fileExtension) {
                                        var mime = require("mime-types");
                                        var mimeType = uploadedFile[i].type;
                                        var extension = mime.extension(mimeType);
                                        if (extension) {
                                            uploadedFileName += `.${extension}`;
                                        }
                                    }

                                    var renamedFilePath = require("path").join(dirname, uploadedFileName);
                                    fs.renameSync(uploadedFile[i].fd, renamedFilePath);

                                    uploadedFile[i].uploadFileName =
                                        RETRIEVE_PATH + uploadedFileName;
                                    uploadedFileTemp.push(uploadedFile[i]);

                                }
                            }
                            console.log("error", error);
                            return cb(error, uploadedFileTemp);
                        }
                    );
                },
                function doneUploading(errLast, filesLast) {
                    var returnObj = {
                        status: true,
                        message: "",
                        uploadedFiles: filesLast,
                    };
                    if (errLast) {
                        returnObj.status = false;
                        returnObj.message = errLast;
                    }
                    return exits.success(returnObj);
                }
            );
        } catch (e) {
            console.log("catch e ", e);
            console.log("upload error", e);
        }
    },
};

const getFileExtension = (filename) => {
    const match = filename.match(/\.(\w+)$/);
    if (match) {
        return match[1]; // returns the file extension without the dot
    }
    return null; // returns null if there's no extension
};
