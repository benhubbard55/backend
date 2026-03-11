module.exports = {
    friendlyName: "Update",
    description: "Update status.",
    inputs: {
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
            var userId = inputs.req.params["userId"];
            var userRecord = await User.findOne({
                id: userId,
            });

            await User.updateOne({
                id: userId,
            }).set({
                isActive: userRecord?.isActive ? false : true,
            });
            if (userRecord?.isActive) {
                let sendData = {
                    action: "userStatus",
                    data: {
                        userBlock: true,
                    },
                    message: sails.__("get update profile successfully"),
                };
                User.publish([userId], sendData);
            }

            return exits.success({
                status: true,
                message: "Status change successfully",
            });
        } catch (error) {
            return exits.success({
                status: false,
                message: serverErrorMsg,
            });
        }
    },
};
