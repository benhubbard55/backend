exports.up = function (knex) {
    return knex.schema.table("deviceTokens", function (t) {
        t.string("deviceId");
    });
};

exports.down = function (knex) {
    return knex.schema.table("deviceTokens", function (t) {
        t.dropColumn("deviceId");
    });
};
