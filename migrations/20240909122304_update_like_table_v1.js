exports.up = function (knex) {
    return knex.schema.table("likes", function (t) {
        t.integer("musicId").nullable();
    });
};

exports.down = function (knex) {
    return knex.schema.table("likes", function (t) {
        t.dropColumn("musicId");
    });
};