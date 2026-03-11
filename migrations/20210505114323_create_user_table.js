exports.up = function (knex, Promise) {
    return knex.schema.createTable("users", (t) => {
        t.increments("id").primary();
        t.integer("userType").comment("1 for user, 2 for artist");
        t.string("name").nullable();
        t.string("email").nullable();
        t.string("password").nullable();
        t.string("phoneNo").nullable();
        t.string("countryCode").nullable();
        t.string("otp").nullable();
        t.text("profileImage").nullable();
        t.boolean("isDeleted").defaultsTo(false);
        t.boolean("isVerified").defaultsTo(false);
        t.text("notificationToken").nullable();
        t.dateTime("createdAt").defaultTo(knex.fn.now());
        t.dateTime("updatedAt").defaultTo(knex.fn.now());
        t.index(
            ["id", "userType", "email", "isDeleted", "isVerified"],
            "users_index"
        );
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("users");
};
