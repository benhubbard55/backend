exports.up = function (knex, Promise) {
    return knex.schema.alterTable("users", (t) => {
        t.string("verificationToken");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.alterTable("users", (t) => {
        t.dropColumn("verificationToken");
    });
};
