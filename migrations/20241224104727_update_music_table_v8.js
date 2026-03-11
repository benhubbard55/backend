exports.up = function (knex) {
    return knex.schema.table("music", function (t) {
        t.text("musicProfileVideo").nullable().after("profileImage");
        t.string("musicProfileType").nullable().after("profileImage");
    });
};

exports.down = function (knex) {
    return knex.schema.table("music", function (t) {
        t.dropColumn("musicProfileVideo");
        t.dropColumn("musicProfileType");
    });
};
