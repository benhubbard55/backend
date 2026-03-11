exports.up = function (knex) {
    return knex.schema.table("music", function (t) {
        t.string("previewStartTime");
        t.string("previewEndTime");
    });
};

exports.down = function (knex) {
    return knex.schema.table("music", function (t) {
        t.dropColumn("previewStartTime");
        t.dropColumn("previewEndTime");
    });
};
