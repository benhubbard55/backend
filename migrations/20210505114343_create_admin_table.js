exports.up = function (knex, Promise) {
    return knex.schema.createTable("admins", (t) => {
        t.increments("id").primary();
        t.string("firstName").nullable();
        t.string("lastName").nullable();
        t.string("email").unique().nullable();
        t.string("password").nullable();
        t.dateTime("createdAt");
        t.dateTime("updatedAt");
        t.index(["id", "email"], "admins_index");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("admins");
};
