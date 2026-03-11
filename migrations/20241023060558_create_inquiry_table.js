exports.up = function (knex, Promise) {
    return knex.schema.createTable("inquiries", (t) => {
        t.increments("id").primary();
        t.string("name").nullable();
        t.string("email").nullable();
        t.string("phoneNo").nullable();
        t.text("message").nullable();
        t.dateTime("createdAt").defaultTo(knex.fn.now());
        t.dateTime("updatedAt").defaultTo(knex.fn.now());
        t.index(["id", "email", "phoneNo"], "inquiries_index");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("inquiries");
};
