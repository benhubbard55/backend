exports.up = function (knex) {
    return knex.schema.createTable("groupMessageStatus", (t) => {
        t.increments("id").primary();
        t.integer("receiverId").nullable();
        t.integer("groupId").nullable();
        t.integer("messageId").nullable();
        t.string("status").nullable();
        t.dateTime("createdAt");
        t.dateTime("updatedAt");
        t.index(
            ["id", "receiverId", "groupId", "messageId"],
            "groupMessageStatus_index"
        );
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("groupMessageStatus");
};
