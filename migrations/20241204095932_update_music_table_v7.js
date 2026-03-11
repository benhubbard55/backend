exports.up = function (knex) {
    return knex.schema.table("music", function (t) {
        t.integer("commentCount").defaultsTo(0).after("likeCount");
    });
};

exports.down = function (knex) {
    return knex.schema.table("music", function (t) {
        t.dropColumn("commentCount");
    });
};
