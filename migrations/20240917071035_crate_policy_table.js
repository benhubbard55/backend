exports.up = function (knex, Promise) {
    return knex.schema.createTable("policy", (t) => {
        t.increments("id").primary();
        t.text("description").nullable();
        t.dateTime("createdAt");
        t.dateTime("updatedAt");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("policy");
};