exports.up = function (knex, Promise) {
    return knex.schema.createTable("music", (t) => {
        t.increments("id").primary();
        t.integer("userId");
        t.string("title");
        t.text("description");
        t.integer("musicTypeId");
        t.boolean("isPremium").defaultsTo(false);
        t.float("amount", 8, 2).defaultTo(0);
        t.text("musicFileName");
        t.text("musicFileDisplayName");
        t.text("profileImage");
        t.string("duration").defaultsTo("00:00");
        t.dateTime("createdAt").defaultTo(knex.fn.now());
        t.dateTime("updatedAt").defaultTo(knex.fn.now());
        t.index(["userId", "isPremium", "musicTypeId", "id"], "music_index");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("music");
};
