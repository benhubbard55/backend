exports.seed = function (knex, Promise) {
    var moment = require("moment");

    return knex("paymentSettings")
        .del()
        .then(function () {
            return knex("paymentSettings").insert([
                {
                    tax: 5,
                    keyName: "admin_commission",
                    createdAt: moment().utc().format("YY-MM-DD HH:mm:ss"),
                    updatedAt: moment().utc().format("YY-MM-DD HH:mm:ss"),
                },
                {
                    tax: 1,
                    keyName: "stripe_fees",
                    createdAt: moment().utc().format("YY-MM-DD HH:mm:ss"),
                    updatedAt: moment().utc().format("YY-MM-DD HH:mm:ss"),
                },
            ]);
        });
};
