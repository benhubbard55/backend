module.exports = {
    inputs: {},
    exits: {
        success: {
            responseType: "view",
            viewTemplatePath: "admin/dashboard",
        },
        redirect: {
            responseType: "redirect",
        },
    },

    fn: async function (inputs, exits) {
        var monthList = moment.monthsShort(); // long names
        const totalIncomeMonthly = [];
        for (let i = 0; i < monthList.length; i++) {
            const monthName = monthList[i];
            const startOfMonth = moment()
                .month(monthName)
                .startOf("month")
                .format("YYYY-MM-DD HH:mm:ss");
            const endOfMonth = moment()
                .month(monthName)
                .endOf("month")
                .format("YYYY-MM-DD HH:mm:ss");

            const total = await TransactionHistory.sum("tax").where({
                transferType: { in: ["buyMusic", "withdraw"] },
                createdAt: { ">=": startOfMonth, "<=": endOfMonth },
            });
            totalIncomeMonthly.push(total);
        }

        return exits.success({
            usersCount: await User.count(),
            adminCount: await Admin.count(),
            musicCount: await Music.count(),
            musicTypeCount: await MusicType.count(),
            totalIncomeMonthly: totalIncomeMonthly.join(","),
        });
    },
};
