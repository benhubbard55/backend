exports.up = function (knex) {
    return knex.schema.table("buyMusic", function (t) {
        t.string("status")
    });
};

exports.down = function (knex) {
    return knex.schema.table("buyMusic", function (t) {
        t.dropColumn("status");
    });
};