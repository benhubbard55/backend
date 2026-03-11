exports.up = function (knex) {
    return knex.schema.createTable("paymentSettings", (t) => {
        t.increments("id").primary();
        t.float("tax", 8, 2).nullable();
        t.dateTime("createdAt").defaultTo(knex.fn.now());
        t.dateTime("updatedAt").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("paymentSettings");
};