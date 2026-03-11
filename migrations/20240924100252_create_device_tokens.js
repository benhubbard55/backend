exports.up = function (knex, Promise) {
    return knex.schema.createTable("deviceTokens", (t) => {
        t.increments("id").primary();
        t.integer("userId").nullable();
        t.text("token").nullable();
        t.dateTime("createdAt").defaultTo(knex.fn.now());
        t.dateTime("updatedAt").defaultTo(knex.fn.now());
        t.index(["id", "userId"], "deviceTokens_index");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("deviceTokens");
};
