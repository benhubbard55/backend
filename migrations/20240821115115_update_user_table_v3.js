exports.up = function (knex) {
    return knex.schema.table("users", function (t) {
        t.boolean("isUserOnline").defaultsTo(false);
        t.string("socketId").nullable();
    });
};

exports.down = function (knex) {
    return knex.schema.table("users", function (t) {
        t.dropColumn("isUserOnline");
        t.dropColumn("socketId");
    });
};
