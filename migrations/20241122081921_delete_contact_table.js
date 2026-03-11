exports.up = function (knex, Promise) {
    return knex.schema.dropTableIfExists("contacts");
};

exports.down = function (knex, Promise) {
    return knex.schema.createTable("contacts", (t) => {
        t.increments("id").primary();
        t.string("name").nullable();
        t.string("email").nullable();
        t.string("contact").nullable();
        t.text("message").nullable();
        t.dateTime("createdAt").defaultTo(knex.fn.now());
        t.dateTime("updatedAt").defaultTo(knex.fn.now());
    });
};