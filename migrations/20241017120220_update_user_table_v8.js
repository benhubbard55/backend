exports.up = function (knex) {
    return knex.schema.table("users", function (t) {
        t.string("accountId").nullable();
    });
};

exports.down = function (knex) {
    return knex.schema.table("users", function (t) {
        t.dropColumn("accountId");
    });
};