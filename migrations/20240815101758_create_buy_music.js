exports.up = function (knex, Promise) {
    return knex.schema.createTable("buyMusic", (t) => {
        t.increments("id").primary();
        t.integer("userId");
        t.integer("musicId");
        t.integer("artistId");
        t.dateTime("createdAt").defaultTo(knex.fn.now());
        t.dateTime("updatedAt").defaultTo(knex.fn.now());
        t.index(["musicId", "userId", "artistId", "id"], "buyMusic_index");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("buyMusic");
};
