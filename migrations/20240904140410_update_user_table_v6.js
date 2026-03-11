exports.up = function (knex) {
    return knex.schema.table("users", function (t) {
        t.boolean("isActive").defaultsTo(true);
    });
};

exports.down = function (knex) {
    return knex.schema.table("users", function (t) {
        t.dropColumn("isActive");
    });
};
