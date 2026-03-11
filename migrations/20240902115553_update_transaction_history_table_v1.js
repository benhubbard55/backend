exports.up = function (knex) {
    return knex.schema.table("transactionHistories", function (t) {
        t.float("totalAmount", 8, 2).defaultTo(0);
        t.integer("receiverId").nullable();
    });
};

exports.down = function (knex) {
    return knex.schema.table("transactionHistories", function (t) {
        t.dropColumn("totalAmount");
        t.dropColumn("receiverId");
    });
};
