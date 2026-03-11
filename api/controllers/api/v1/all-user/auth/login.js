module.exports = {
    friendlyName: "Login",
    inputs: {
        email: {
            required: true,
            isEmail: true,
            type: "string",
        },
        password: {
            type: "string",
            required: true,
        },
    },
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
        badRequest: sails.config.globals.statusCodes.badRequest,
        notFound: sails.config.globals.statusCodes.notFound,
        badCombo: {
            description: `The provided email and password combination does not
      match any user in the database.`,
        },
    },
    fn: async function (inputs, exits) {
        try {
            let { email, password } = inputs;

            var userRecord = await User.findOne({
                email,
                isDeleted: false
            });
            if (!userRecord) {
                return exits.notFound({
                    status: false,
                    message: "User not found",
                });
            }

            if (!userRecord?.isVerified) {
                return exits.badRequest({
                    status: false,
                    message: "User not verified",
                });
            }

            if (!userRecord?.isActive) {
                return exits.badRequest({
                    status: false,
                    isBlockUser: true,
                    message: "Your account has been blocked. Please contact support.",
                });
            }

            try {
                await sails.helpers.passwords.checkPassword(
                    password,
                    userRecord.password
                );
            } catch (error) {
                return exits.badCombo({
                    status: false,
                    message: "Invalid password",
                });
            }

            return exits.success({
                status: true,
                data: userRecord,
                token: jwToken.issue({
                    id: userRecord.id,
                }),
                message: "Login successfully",
            });
        } catch (error) {
            return exits.invalid({
                status: false,
                message: serverErrorMsg,
                error: error
            });
        }
    },
};
