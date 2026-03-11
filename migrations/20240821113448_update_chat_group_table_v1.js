exports.up = function (knex) {
    return knex.schema.table("chatGroups", function (t) {
        t.boolean("isDeletedFromUserSide").defaultsTo(false);
        t.boolean("isDeletedFromCreatorSide").defaultsTo(false);
    });
};

exports.down = function (knex) {
    return knex.schema.table("chatGroups", function (t) {
        t.dropColumn("isDeletedFromUserSide");
        t.dropColumn("isDeletedFromCreatorSide");
    });
};
