exports.up = function (knex) {
    return knex.schema.alterTable("users", function (t) {
        t.integer('followingCount').defaultTo(0).after("followCount");
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable("users", function (t) {
        t.dropColumn("followingCount");
    });
};