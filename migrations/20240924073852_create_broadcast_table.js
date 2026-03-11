exports.up = function (knex, Promise) {
    return knex.schema.createTable("broadcasts", (t) => {
        t.increments("id").primary();
        t.string("title").nullable();
        t.string("description").nullable();
        t.dateTime("createdAt").defaultTo(knex.fn.now());
        t.dateTime("updatedAt").defaultTo(knex.fn.now());
        t.index(["id"], "broadcasts_index");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("broadcasts");
};
