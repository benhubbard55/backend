exports.up = function (knex) {
    return knex.schema.createTable("playlistMusic", (t) => {
        t.increments("id").primary();
        t.integer("playlistId").nullable();
        t.integer("musicId").nullable();
        t.integer("userId").nullable();
        t.dateTime("createdAt").defaultTo(knex.fn.now());
        t.dateTime("updatedAt").defaultTo(knex.fn.now());
        t.index(["id", "playlistId", "musicId", "userId"], "playlistMusic_index");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("playlistMusic");
};
