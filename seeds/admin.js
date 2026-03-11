exports.seed = function (knex, Promise) {
    var moment = require("moment");

    return knex("admins")
        .del()
        .then(function () {
            return knex('admins').insert([{
                email: 'admin@uphony.com',
                firstName: 'admin',
                lastName: 'uphony',
                password: '$2a$10$BsYsgCTwXjugPPfJOhO9ju74ISFJ89PJIfRs9Hio/Dj.AFiR2c3bi',
                createdAt: moment().utc().format('YY-MM-DD HH:mm:ss'),
                updatedAt: moment().utc().format('YY-MM-DD HH:mm:ss'),
            }]);
        });
};
