exports.up = function (knex) {
    return knex.schema.createTable("reportUser", (t) => {
        t.increments("id").primary();
        t.integer("reportBy").nullable();
        t.integer("reportTo").nullable();
        t.integer("musicId").nullable();
        t.string("reason").nullable();
        t.dateTime("createdAt").defaultTo(knex.fn.now());
        t.dateTime("updatedAt").defaultTo(knex.fn.now());
        t.index(["id", "reportBy", "reportTo", "musicId"], "reportUser_index");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("reportUser");
};
