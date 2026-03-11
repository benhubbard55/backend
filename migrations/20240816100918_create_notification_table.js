exports.up = function (knex, Promise) {
    return knex.schema.createTable("notification", (t) => {
        t.increments("id").primary();
        t.integer("senderId");
        t.integer("receiverId");
        t.boolean("isRead");
        t.string("notificationType");
        t.integer("redirectId");
        t.string("title");
        t.text("description");
        t.dateTime("createdAt").defaultTo(knex.fn.now());
        t.dateTime("updatedAt").defaultTo(knex.fn.now());
        t.index(
            ["senderId", "receiverId", "notificationType", "id"],
            "notification_index"
        );
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("notification");
};
