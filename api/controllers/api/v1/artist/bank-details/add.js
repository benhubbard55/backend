module.exports = {
    inputs: {
        sourceId: {
            type: "string",
            required: true,
        },
    },
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
        conflict: sails.config.globals.statusCodes.conflict,
        badRequest: sails.config.globals.statusCodes.badRequest,
    },
    fn: async function (inputs, exits) {
        // try {
        const loginUserData = this.req.loggedInUser;

        let { sourceId } = inputs;
        sourceId = sourceId?.trim();

        const findAccount = await User.findOne({
            id: loginUserData?.id,
        });

        if (findAccount?.accountId) {
            return exits.conflict({
                status: false,
                message: "You’ve already added this account. Please enter a different one.",
            });
        }
        // create customer if not exist
        let accountId = await sails.helpers.createAccountIfNotExist.with({
            loginUserData: loginUserData,
            btok: sourceId,
            req: this.req,
        });

        if (!accountId) {
            return exits.badRequest({
                status: false,
                message: "Payment failed, account issue",
            });
        }

        return exits.success({
            status: true,
            message: "Bank account added successfully!",
        });
        // } catch (error) {
        //     return exits.invalid({
        //         status: false,
        //         message: serverErrorMsg,
        //         error: error,
        //     });
        // }
    },
};
