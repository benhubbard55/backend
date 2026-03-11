module.exports = {
    inputs: {},
    exits: {},

    fn: async function (inputs, exits) {
        const year = parseInt(this.req.query["year"]) || moment().year();
        const monthList = moment.monthsShort(); // short month names
        const totalIncomeMonthly = new Array(monthList.length).fill(0);
        const totalProfitMonthly = new Array(monthList.length).fill(0);

        const transactions = await TransactionHistory.find({
            where: {
                createdAt: {
                    ">=": moment().year(year).startOf("year").toDate(),
                    "<=": moment().year(year).endOf("year").toDate(),
                },
                transferType: { in: ["buyMusic", "sellMusic"] },
                status: "success"
            },
        });

        for (let i = 0; i < transactions.length; i++) {
            const transaction = transactions[i];
            const monthIndex = moment(transaction.createdAt).month();
            if (transaction.transferType === "buyMusic") {
                totalIncomeMonthly[monthIndex] += transaction.amount;
            } else if (transaction.transferType === "sellMusic") {
                totalProfitMonthly[monthIndex] += transaction.tax;
            }
        }

        const actualCoast = await TransactionHistory.find({
            where: {
                transferType: { in: ["buyMusic", "sellMusic"] },
                status: "success"
            },
        });
        const actualIncome = actualCoast
            .filter((data) => data.transferType === "buyMusic")
            .reduce((sum, record) => sum + record.amount, 0).toFixed(2);
        const actualProfit = actualCoast
            .filter((data) => data.transferType === "sellMusic")
            .reduce((sum, record) => sum + record.tax, 0).toFixed(2);

        return exits.success({
            monthList,
            totalIncomeMonthly,
            totalProfitMonthly,
            totalIncomeYearly: totalIncomeMonthly
                .reduce((sum, count) => sum + count, 0)
                .toFixed(2),
            totalProfitYearly: totalProfitMonthly
                .reduce((sum, count) => sum + count, 0)
                .toFixed(2),
            actualIncome,
            actualProfit,
        });
    },
};
