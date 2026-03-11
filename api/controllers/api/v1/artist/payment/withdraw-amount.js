module.exports = {
    inputs: {
        amount: {
            type: "number",
            required: true,
        },
    },
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
        normalError: sails.config.globals.statusCodes.normalError,
        notFound: sails.config.globals.statusCodes.notFound,
        badRequest: sails.config.globals.statusCodes.badRequest,
    },
    fn: async function (inputs, exits) {
        try {
            const loginUserData = this.req.loggedInUser;
            const { amount } = inputs;

            if (amount > loginUserData?.balance) {
                return exits.badRequest({
                    status: false,
                    message: "Insufficient balance"
                })
            }

            const accountId = loginUserData?.accountId;
            if (!accountId) {
                return exits.notFound({
                    status: false,
                    message: "Account not found",
                });
            }
            const transferData =
                await sails.helpers.stripe.createAccountTransfer.with({
                    amount: amount,
                    accountId: accountId,
                });
            if (!transferData?.status) {
                return exits.normalError({
                    status: false,
                    message: "Payment failed",
                });
            }

            const listAccounts = await sails.helpers.stripe.listBankAccounts.with({
                accountId: loginUserData?.accountId,
            });
            if (!listAccounts?.status) {
                return exits.notFound({
                    status: false,
                    message: "Account not found",
                });
            }

            const createTransactionHistory = await TransactionHistory.create({
                // artist perspective
                userId: loginUserData?.id,
                amount: amount,
                type: "debit",
                tax: 0,
                transferType: "withdraw",
                totalAmount: amount,
                receiverId: loginUserData?.id,
                status: "pending",
            }).fetch();
            const payoutData = await sails.helpers.stripe.createPayout.with({
                amount: amount,
                bankAccount: listAccounts?.data[0].id,
                accountId: accountId,
                metadata: {
                    transactionHistoryId: createTransactionHistory?.id,
                    artistId: loginUserData?.id,
                },
            });

            if (!payoutData?.status) {
                return exits.normalError({
                    status: false,
                    message: "Payment process failed",
                });
            }

            await TransactionHistory.updateOne({
                id: createTransactionHistory?.id,
            }).set({
                transactionId: payoutData?.status ? payoutData?.id : null,
            });

            return exits.success({
                status: true,
                message: "Payout successfully done",
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
