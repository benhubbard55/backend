exports.up = function (knex) {
    return knex.schema.table("paymentSettings", function (t) {
        t.string("keyName");
    });
};

exports.down = function (knex) {
    return knex.schema.table("paymentSettings", function (t) {
        t.dropColumn("keyName");
    });
};
