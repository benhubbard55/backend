module.exports = {
    friendlyName: "Verify OTP",
    description: "",
    inputs: {
        email: {
            required: true,
            isEmail: true,
            type: "string",
        },
        otp: {
            type: "string",
            required: true,
        },
    },
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
        badRequest: sails.config.globals.statusCodes.badRequest,
        notFound: sails.config.globals.statusCodes.notFound,
        normalError: sails.config.globals.statusCodes.normalError,
    },
    fn: async function (inputs, exits) {
        try {
            let { otp, email } = inputs;

            const findUser = await User.findOne({
                email,
                isVerified: false,
                isDeleted: false,
            });

            if (findUser) {
                if (findUser?.otp != otp) {
                    return exits.badRequest({
                        status: false,
                        message: "Invalid OTP",
                    });
                }

                const checkValidity = await sails.helpers.checkOtpTime(
                    findUser.updatedAt
                );

                if (checkValidity) {
                    await Jobs.create("createStripCustomer", {
                        name: findUser?.name,
                        email: findUser?.email,
                        phoneNo: `${findUser?.countryCode}-${findUser?.phoneNo}`,
                        userId: findUser?.id,
                    })
                        .priority("low")
                        .attempts(5)
                        .save(function (err) {
                            return;
                        });

                    return exits.success({
                        status: true,
                        message: "Account registered successfully!",
                    });
                } else {
                    return exits.normalError({
                        status: false,
                        message: "OTP Expired!",
                    });
                }
            } else {
                return exits.notFound({
                    status: false,
                    message: "User not found",
                });
            }
        } catch (error) {
            return exits.invalid({
                status: false,
                message: serverErrorMsg,
            });
        }
    },
};
