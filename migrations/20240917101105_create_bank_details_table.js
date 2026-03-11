exports.up = function (knex, Promise) {
    return knex.schema.createTable("bankDetails", (t) => {
        t.increments("id").primary();
        t.integer("artistId");
        t.string("sourceId");
        t.dateTime("createdAt").defaultTo(knex.fn.now());
        t.dateTime("updatedAt").defaultTo(knex.fn.now());
        t.index(["id", "artistId", "sourceId"], "bankDetails_index");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("bankDetails");
};
