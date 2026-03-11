exports.up = function (knex) {
    return knex.schema.table("users", function (t) {
        t.boolean("isPendingUnReadNotification").defaultsTo(false);
    });
};

exports.down = function (knex) {
    return knex.schema.table("users", function (t) {
        t.dropColumn("isPendingUnReadNotification");
    });
};
