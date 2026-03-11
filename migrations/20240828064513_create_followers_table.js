exports.up = function (knex) {
    return knex.schema.createTable("followers", (t) => {
        t.increments("id").primary();
        t.integer("followedBy").nullable();
        t.integer("followedTo").nullable();
        t.dateTime("createdAt").defaultTo(knex.fn.now());
        t.dateTime("updatedAt").defaultTo(knex.fn.now());
        t.index(["id", "followedBy", "followedTo"], "followers_index");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("followers");
};
