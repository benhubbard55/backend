exports.up = function (knex) {
    return knex.schema.createTable("musicDownloadHistories", (t) => {
        t.increments("id").primary();
        t.integer("userId").nullable();
        t.integer("musicId").nullable();
        t.dateTime("createdAt").defaultTo(knex.fn.now());
        t.dateTime("updatedAt").defaultTo(knex.fn.now());
        t.index(["id", "musicId", "userId"], "musicDownloadHistories_index");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("musicDownloadHistories");
};