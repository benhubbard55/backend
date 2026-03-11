module.exports = {
    friendlyName: "Update profile",
    inputs: {
        name: {
            type: "string",
            required: true,
        },
        // email: {
        //     required: true,
        //     isEmail: true,
        //     type: "string",
        // },
        // phoneNo: {
        //     type: "string",
        //     required: true,
        // },
        // countryCode: {
        //     type: "string",
        //     required: true,
        // },
        req: {
            type: "ref",
            required: true,
        },
    },
    exits: {
        success: sails.config.globals.statusCodes.success,
    },
    fn: async function (inputs, exits) {
        try {
            let { name, email, phoneNo, countryCode, req } = inputs;
            const userId = req.params["id"];
            const loginUserData = await User.findOne({
                id: userId,
            });

            if (!loginUserData) {
                req.session.flash = {
                    type: "error",
                    message: "User not found!",
                };
                throw "User not found"
            }

            // const findByEmail = await User.findOne({
            //     id: { "!=": loginUserData?.id },
            //     email,
            //     isDeleted: 0,
            //     isVerified: 1,
            // });
            // if (findByEmail) {
            //     req.session.flash = {
            //         type: "error",
            //         message: "Email already exist!",
            //     };
            // }

            // countryCode = await sails.helpers.countryCode(countryCode);

            const updateObj = {
                name,
                // email,
                // phoneNo,
                // countryCode,
            };

            if (req._fileparser?.upstreams.length > 0) {
                var fileUploadResponse = await sails.helpers.file.fileUpload(
                    req,
                    "file",
                    sails.config.globals.imagePath.USER_PROFILE_IMAGE_STORE_PATH,
                    ""
                );

                if (fileUploadResponse?.uploadedFiles.length > 0) {
                    if (loginUserData?.profileImage) {
                        await sails.helpers.file.deleteFile(
                            loginUserData?.profileImage,
                            sails.config.globals.imagePath.USER_PROFILE_IMAGE_STORE_PATH
                        );
                    }

                    const fileName = fileUploadResponse?.uploadedFiles[0].uploadFileName;
                    updateObj.profileImage = fileName;
                }
            }
            const data = await User.updateOne({
                id: loginUserData?.id,
            }).set(updateObj);

            let sendData = {
                action: "userProfile",
                data: {
                    userData: data?.toJSON(),
                },
                message: sails.__("get update profile successfully"),
            };
            User.publish([userId], sendData);

            req.session.flash = {
                type: "success",
                message: "Update successfully",
            };
        } catch (error) {
            req.session.flash = {
                type: "error",
                message: error || serverErrorMsg,
            };
        } finally {
            return exits.success(true);
        }
    },
};
