
exports.up = function (knex, Promise) {
    return knex.schema.createTable("terms", (t) => {
        t.increments("id").primary();
        t.longtext("description").nullable();
        t.dateTime("createdAt");
        t.dateTime("updatedAt");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("terms");
};