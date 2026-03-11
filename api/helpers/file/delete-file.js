module.exports = {
    friendlyName: "Delete file",
    description: "",
    inputs: {
        fileName: {
            type: "string",
            description: " provides the name of file",
            required: false,
            allowNull: true,
        },
        path: {
            type: "string",
            description: " provides the name of file",
            required: false,
            allowNull: true,
        },
    },
    exits: {
        success: {
            description: "All done.",
        },
    },
    fn: async function (inputs, exits) {
        if (!inputs.fileName) {
            return exits.success({
                status: false,
            });
        }
        try {
            var fs = require("fs");
            var fullPath = require("path").resolve(
                sails.config.appPath,
                inputs.path + "/" + inputs.fileName
            );
            if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
                fs.unlink(fullPath, (err) => {
                    if (err) {
                        sails.log.warn("file delete err: ", err);
                    }
                });
            }

            var fullPathForTmp = require("path").resolve(
                sails.config.appPath,
                ".tmp/public/assets/" + inputs.fileName
            );
            if (
                fs.existsSync(fullPathForTmp) &&
                fs.statSync(fullPathForTmp).isFile()
            ) {
                fs.unlink(fullPathForTmp, (err) => {
                    if (err) {
                        sails.log.warn(".tmp file delete err: ", err);
                    }
                });
            }
        } catch (err) {
            sails.log.warn("file delete err catch: ", err.message);
        }
        return exits.success({
            status: true,
        });
    },
};
