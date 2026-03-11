exports.up = function (knex) {
    return knex.schema.table("music", function (t) {
        t.string("fileType").nullable();
        t.integer("minutes").defaultsTo(0);
        t.integer("seconds").defaultsTo(0);
    });
};

exports.down = function (knex) {
    return knex.schema.table("music", function (t) {
        t.dropColumn("fileType");
        t.dropColumn("minutes");
        t.dropColumn("second");
    });
};
