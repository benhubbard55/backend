exports.up = function (knex) {
    return knex.schema.table("notification", function (t) {
        t.boolean("isFromAdmin").defaultsTo(0);
    });
};

exports.down = function (knex) {
    return knex.schema.table("notification", function (t) {
        t.dropColumn("isFromAdmin");
    });
};
