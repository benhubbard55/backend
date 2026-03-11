exports.up = function (knex) {
    return knex.schema.createTable("comments", (t) => {
        t.increments("id").primary();
        t.integer("commentBy").nullable();
        t.integer("musicId").nullable();
        t.string("content").nullable();
        t.dateTime("createdAt").defaultTo(knex.fn.now());
        t.dateTime("updatedAt").defaultTo(knex.fn.now());
        t.index(["id", "commentBy", "musicId"], "comments_index");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("comments");
};
