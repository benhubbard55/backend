module.exports = {
    friendlyName: "Single file upload",
    description: "",
    inputs: {
        req: {
            type: "ref",
            description: "The current incoming request (req).",
            required: true,
        },
        filename: {
            type: "string",
            required: true,
        },
        dirname: {
            type: "string",
            required: false,
        },
        retrievePath: {
            type: "string",
        },
    },
    exits: {},
    fn: async function (inputs, exits) {
        var req = inputs.req;
        var filesToUpload = req.file(inputs.filename);

        filesToUpload.upload(
            {
                dirname: require("path").resolve(sails.config.appPath, inputs.dirname),
                maxBytes: 75 * 1024 * 1024, // 75 MB
                maxTimeToBuffer: 72000000, // 2 hours
            },
            async (error, uploadedFile) => {
                if (error) {
                    return exits.success({
                        status: false,
                        message: error.message,
                        error: error,
                    });
                } else {
                    var uploadedFileTemp = [];
                    if (
                        uploadedFile &&
                        Array.isArray(uploadedFile) &&
                        uploadedFile.length > 0
                    ) {
                        for (var i = 0; i < uploadedFile.length; i++) {
                            if (!uploadedFile[i] || typeof uploadedFile[i] === "undefined") {
                                continue;
                            }
                            var uploadedFileName = uploadedFile[i].fd
                                .split("/")
                                .pop()
                                .split("#")[0]
                                .split("?")[0];
                            uploadedFile[i].uploadFileName =
                                inputs.retrievePath + uploadedFileName;
                            uploadedFileTemp.push(uploadedFile[i]);
                        }
                    }

                    return exits.success({
                        status: true,
                        message: "",
                        uploadedFiles: uploadedFileTemp,
                    });
                }
            }
        );
    },
};
