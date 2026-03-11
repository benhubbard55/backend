exports.seed = function (knex, Promise) {
    var moment = require("moment");

    return knex("musicType")
        .del()
        .then(function () {
            return knex("musicType").insert([
                {
                    genreName: "Rock",
                    isActive: 1,
                    createdAt: moment().utc().format("YY-MM-DD HH:mm:ss"),
                    updatedAt: moment().utc().format("YY-MM-DD HH:mm:ss"),
                },
                {
                    genreName: "Pop",
                    isActive: 1,
                    createdAt: moment().utc().format("YY-MM-DD HH:mm:ss"),
                    updatedAt: moment().utc().format("YY-MM-DD HH:mm:ss"),
                },
                {
                    genreName: "Hip-Hop",
                    isActive: 1,
                    createdAt: moment().utc().format("YY-MM-DD HH:mm:ss"),
                    updatedAt: moment().utc().format("YY-MM-DD HH:mm:ss"),
                },
                {
                    genreName: "Jazz",
                    isActive: 1,
                    createdAt: moment().utc().format("YY-MM-DD HH:mm:ss"),
                    updatedAt: moment().utc().format("YY-MM-DD HH:mm:ss"),
                },
                {
                    genreName: "Classical",
                    isActive: 1,
                    createdAt: moment().utc().format("YY-MM-DD HH:mm:ss"),
                    updatedAt: moment().utc().format("YY-MM-DD HH:mm:ss"),
                },
            ]);
        });
};
