exports.up = function (knex) {
    return knex.schema.table("chatGroups", function (t) {
        t.datetime("removeFromGroupTimeForUserSide").defaultsTo(null);
        t.datetime("removeFromGroupTimeForCreatorSide").defaultTo(null);
    });
};

exports.down = function (knex) {
    return knex.schema.table("chatGroups", function (t) {
        t.dropColumn("removeFromGroupTimeForUserSide");
        t.dropColumn("removeFromGroupTimeForCreatorSide");
    });
};