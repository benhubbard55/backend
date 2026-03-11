exports.up = function (knex) {
    return knex.schema.table("users", function (t) {
        t.float("balance", 8, 2).defaultTo(0);
    });
};

exports.down = function (knex) {
    return knex.schema.table("users", function (t) {
        t.dropColumn("balance");
    });
};
