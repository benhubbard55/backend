exports.up = function (knex, Promise) {
    return knex.schema.createTable("chats", (t) => {
        t.increments("id").primary();
        t.datetime("createdAt").nullable();
        t.datetime("updatedAt").nullable();
        t.string("secretId").nullable();
        t.integer("senderId").nullable();
        t.integer("receiverId").nullable();
        t.integer("chatGroupId").nullable();
        t.text("message", "mediumtext").nullable();
        t.string("messageData").nullable();
        t.string("messageMediaType").defaultsTo("text");
        t.string("type").defaultsTo("group");
        t.string("mediaSize").nullable();
        t.string("vedioThumbnail").nullable();
        t.string("mediaProperty").nullable();

        t.index(
            ["id", "senderId", "secretId", "receiverId", "chatGroupId"],
            "chats_index"
        );
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("chats");
};
