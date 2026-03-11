exports.up = function (knex) {
    return knex.schema.createTable("albumMusic", (t) => {
        t.increments("id").primary();
        t.integer("albumId").nullable();
        t.integer("musicId").nullable();
        t.integer("userId").nullable();
        t.dateTime("createdAt").defaultTo(knex.fn.now());
        t.dateTime("updatedAt").defaultTo(knex.fn.now());
        t.index(["id", "albumId", "musicId", "userId"], "albumMusic_index");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("albumMusic");
};
