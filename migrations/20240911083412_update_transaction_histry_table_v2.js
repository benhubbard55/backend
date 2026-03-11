exports.up = function (knex) {
    return knex.schema.table("transactionHistories", function (t) {
        t.integer("musicId").nullable();
    });
};

exports.down = function (knex) {
    return knex.schema.table("transactionHistories", function (t) {
        t.dropColumn("musicId");
    });
};