module.exports = {
    friendlyName: "Create user",
    description: "",
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
        password: {
            type: "string",
            required: true,
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
        conflict: sails.config.globals.statusCodes.conflict,
        normalError: sails.config.globals.statusCodes.normalError,
    },
    fn: async function (inputs, exits) {
        try {
            let { name, email, password, phoneNo, countryCode } = inputs;

            if (inputs?.countryCode) {
                countryCode = await sails.helpers.countryCode(countryCode);
            }

            const findEmail = await User.findOne({
                email: email,
                isVerified: 1,
                isDeleted: 0,
            });

            if (findEmail) {
                return exits.conflict({
                    status: false,
                    message: "Email already exist",
                });
            }

            let createObj = {
                name,
                email,
                password,
                phoneNo,
                countryCode,
            };

            const { otp } = await sails.helpers.generateAndSendOtp();
            createObj = { ...createObj, otp };

            const findOldUser = await User.findOne({
                email: email,
                isDeleted: 0,
                isVerified: 0,
            });

            if (findOldUser) {
                await User.updateOne({
                    id: findOldUser?.id,
                }).set(createObj);
            } else {
                await User.create(createObj).fetch();
            }

            await sails.helpers.sendEmail.with({
                to: email,
                subject: "Verification Code",
                template: "email-register-otp",
                typeOfSend: "queue", // 'now', 'queue', 'preview'
                layout: "layout-email",
                templateData: {
                    name: name,
                    otp: otp,
                },
            });

            return exits.success({
                status: true,
                message: "User record created successfully!",
            });
        } catch (error) {
            return exits.invalid({
                status: false,
                message: serverErrorMsg,
                error: error,
            });
        }
    },
};
