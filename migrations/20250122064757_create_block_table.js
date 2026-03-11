exports.up = function (knex) {
    return knex.schema.createTable("blockUser", (t) => {
        t.increments("id").primary();
        t.integer("blockBy").nullable();
        t.integer("blockTo").nullable();
        t.dateTime("createdAt").defaultTo(knex.fn.now());
        t.dateTime("updatedAt").defaultTo(knex.fn.now());
        t.index(["id", "blockBy", "blockTo"], "blockUser_index");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("blockUser");
};
