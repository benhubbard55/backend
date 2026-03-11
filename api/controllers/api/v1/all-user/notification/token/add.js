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

            const findToken = await DeviceToken.findOne({
                deviceId: deviceId,
            });

            const createOrUpdateObj = {
                userId: loginUserData?.id,
                deviceId: deviceId,
                token: token,
            };
            if (findToken) {
                await DeviceToken.updateOne({
                    id: findToken?.id,
                }).set(createOrUpdateObj);
                return exits.success({
                    success: true,
                    message: "Token updated successfully",
                });
            } else {
                await DeviceToken.create(createOrUpdateObj);
                return exits.success({
                    success: true,
                    message: "Token added successfully",
                });
            }
        } catch (error) {
            return exits.success({
                status: false,
                message: serverErrorMsg,
                error: error,
            });
        }
    },
};
