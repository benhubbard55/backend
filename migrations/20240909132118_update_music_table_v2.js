exports.up = function (knex) {
    return knex.schema.table("music", function (t) {
        t.integer("downloadCount").defaultsTo(0);
    });
};

exports.down = function (knex) {
    return knex.schema.table("music", function (t) {
        t.dropColumn("downloadCount");
    });
};
