exports.up = function (knex, Promise) {
    return knex.schema.createTable("chatGroups", (t) => {
        t.increments("id").primary();
        t.datetime("createdAt").nullable();
        t.datetime("updatedAt").nullable();
        t.string("secretId").nullable();
        t.integer("creatorId").nullable();
        t.integer("userId").nullable();
        t.integer("lastMsgId").nullable();
        t.string("title").nullable();
        t.string("type").defaultsTo("direct");

        t.index(
            ["id", "creatorId", "secretId", "userId", "lastMsgId"],
            "chatGroups_index"
        );
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("chatGroups");
};
