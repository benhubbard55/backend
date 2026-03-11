module.exports = {
    inputs: {
        token: {
            type: "string",
            required: true,
        },
        deviceId: {
            type: "string",
            required: true,
        },
    },
    exits: {
        success: sails.config.globals.statusCodes.success,
    },
    fn: async function (inputs, exits) {
        try {
            const { token, deviceId } = inputs;
            const loginUserData = this.req.loggedInUser;

            const deleteObj = {
                userId: loginUserData?.id,
                token: token,
                deviceId: deviceId,
            };

            await DeviceToken.destroy(deleteObj);

            return exits.success({
                success: true,

                message: "Token remove successfully",
            });
        } catch (error) {
            return exits.success({
                status: false,
                message: serverErrorMsg,
                error: error,
            });
        }
    },
};
