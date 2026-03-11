exports.up = function (knex) {
    return knex.schema.createTable("likes", (t) => {
        t.increments("id").primary();
        t.integer("likedBy").nullable();
        t.integer("likedTo").nullable();
        t.dateTime("createdAt").defaultTo(knex.fn.now());
        t.dateTime("updatedAt").defaultTo(knex.fn.now());
        t.index(["id", "likedBy", "likedTo"], "likes_index");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("likes");
};
