module.exports = {
    inputs: {},
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
        notFound: sails.config.globals.statusCodes.notFound,
    },
    fn: async function (inputs, exits) {
        try {
            const loginUserData = this.req.loggedInUser;

            if (!loginUserData?.accountId) {
                return exits.notFound({
                    status: false,
                    message: "Account not found"
                })
            }

            let data = await sails.helpers.stripe.listBankAccounts.with({
                accountId: loginUserData?.accountId,
            });
            if (!data?.status) {
                return exits.invalid({
                    status: true,
                    message: "List not fetched",
                });
            }
            return exits.success({
                status: true,
                message: "Bank account fetched successfully!",
                bankList: data?.data[0],
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
