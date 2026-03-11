module.exports = {
    inputs: {
        name: {
            type: "string",
            required: true,
        },
        email: {
            required: true,
            isEmail: true,
            type: "string",
        },
        phoneNo: {
            type: "string",
            required: false,
        },
        countryCode: {
            type: "string",
            required: false,
        },
    },
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
        notFound: sails.config.globals.statusCodes.notFound,
    },
    fn: async function (inputs, exits) {
        try {
            const loginUserData = this.req.loggedInUser;
            let { name, email, phoneNo, countryCode } = inputs;

            const findByEmail = await User.findOne({
                id: { "!=": loginUserData?.id },
                email,
                isDeleted: 0,
                isVerified: 1,
            });
            if (findByEmail) {
                return exits.notFound({
                    status: false,
                    message: "Email already exist!",
                });
            }
            if (inputs?.countryCode) {
                countryCode = await sails.helpers.countryCode(countryCode);
            }

            const updateObj = {
                name,
                email,
                phoneNo,
                countryCode,
            };

            if (this.req._fileparser?.upstreams.length > 0) {
                var fileUploadResponse = await sails.helpers.file.fileUpload(
                    this.req,
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
            let data;
            const createUpdateObj = {
                name: name,
                email: email,
                phoneNo: `${countryCode}-${phoneNo}`,
            };
            if (loginUserData?.customerId) {
                data = await sails.helpers.stripe.updateCustomer.with({
                    ...createUpdateObj,
                    customerId: loginUserData?.customerId,
                });
            } else {
                data = await sails.helpers.stripe.createCustomer.with(createUpdateObj);
            }

            const getUpdatedUser = await User.updateOne({
                id: loginUserData?.id,
            }).set({ ...updateObj, customerId: data?.status ? data?.id : null });

            return exits.success({
                status: true,
                message: "Profile Updated Successfully",
                data: getUpdatedUser || {}
            });
        } catch (error) {
            console.log(error);
            return exits.invalid({
                status: false,
                message: serverErrorMsg,
            });
        }
    },
};
