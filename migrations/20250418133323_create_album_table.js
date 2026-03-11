exports.up = function (knex) {
    return knex.schema.createTable("album", (t) => {
        t.increments("id").primary();
        t.string("albumName").nullable();
        t.string("albumCoverImage").nullable();
        t.integer("userId").nullable();
        t.integer("musicCount").defaultsTo(0);
        t.dateTime("createdAt").defaultTo(knex.fn.now());
        t.dateTime("updatedAt").defaultTo(knex.fn.now());
        t.index(["id", "userId"], "album_index");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("album");
};
