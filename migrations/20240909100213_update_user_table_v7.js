exports.up = function (knex) {
    return knex.schema.table("users", function (t) {
        t.integer("followCount").defaultsTo(0);
    });
};

exports.down = function (knex) {
    return knex.schema.table("users", function (t) {
        t.dropColumn("followCount");
    });
};