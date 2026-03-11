exports.up = function (knex) {
    return knex.schema.table("notification", function (t) {
        t.string("showTo").nullable();
    });
};

exports.down = function (knex) {
    return knex.schema.table("notification", function (t) {
        t.dropColumn("showTo");
    });
};
