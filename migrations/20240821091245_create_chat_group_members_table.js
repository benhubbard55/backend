exports.up = function (knex, Promise) {
    return knex.schema.createTable("chatGroupMembers", (t) => {
        t.increments("id").primary();
        t.datetime("createdAt").nullable();
        t.datetime("updatedAt").nullable();
        t.integer("chatGroupId").nullable();
        t.integer("memberId").nullable();
        t.boolean("isDeleted").defaultsTo(false).nullable();
        t.time("removeFromGroupTime").defaultsTo(null).nullable();
        t.date("removeFromGroupDate").defaultsTo(null).nullable();

        t.index(
            ["id", "chatGroupId", "memberId", "isDeleted"],
            "chatGroupMembers_index"
        );
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("chatGroupMembers");
};
