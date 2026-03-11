exports.up = function (knex) {
    return knex.schema.table("transactionHistories", function (t) {
        t.string("status").nullable();
    });
};

exports.down = function (knex) {
    return knex.schema.table("transactionHistories", function (t) {
        t.dropColumn("status");
    });
};
