exports.up = function (knex) {
    return knex.schema.createTable("transactionHistories", (t) => {
        t.increments("id").primary();
        t.integer("userId").nullable();
        t.integer("buyMusicId").nullable();
        t.float("amount", 8, 2).defaultTo(0);
        t.float("tax", 8, 2).defaultTo(0)
        t.string("type").nullable();
        t.string("transferType").nullable();
        t.string("transactionId").nullable();
        t.dateTime("createdAt").defaultTo(knex.fn.now());
        t.dateTime("updatedAt").defaultTo(knex.fn.now());
        t.index(
            [
                "id",
                "userId",
                "buyMusicId",
                "transactionId",
            ],
            "transactionHistories_index"
        );
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("transactionHistories");
};
