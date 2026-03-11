exports.up = function (knex) {
    return knex.schema.table("users", function (t) {
        t.string("customerId").nullable();
    });
};

exports.down = function (knex) {
    return knex.schema.table("users", function (t) {
        t.dropColumn("customerId");
    });
};
