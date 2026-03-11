exports.up = function (knex, Promise) {
    return knex.schema.createTable("musicType", (t) => {
        t.increments("id").primary();
        t.string("genreName").nullable();
        t.boolean("isActive").defaultsTo(true);
        t.dateTime("createdAt").defaultTo(knex.fn.now());
        t.dateTime("updatedAt").defaultTo(knex.fn.now());
        t.index(
            ["id", "isActive"],
            "musicType_index"
        );
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("musicType");
};
