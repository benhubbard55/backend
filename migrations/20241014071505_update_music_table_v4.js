exports.up = function (knex) {
    return knex.schema.table("music", function (t) {
        t.boolean("isDeleted").defaultsTo(false);
    });
};

exports.down = function (knex) {
    return knex.schema.table("music", function (t) {
        t.dropColumn("isDeleted");
    });
};
