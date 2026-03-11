module.exports.policies = {
    "*": false,

    // Bypass the `is-super-admin` policy for:
    "admin/*": ["is-super-admin"],
    "admin/admin/auth/*": true,

    "api/v1/all-user/auth/*": true,
    "api/v1/artist/*": ["isAuthorizedAllUsers"],
    "api/v1/user/*": ["isAuthorizedAllUsers"],
    "api/v1/all-user/*": ["isAuthorizedAllUsers"],

    "common/*": true,
    "front/*": true,

    swagger: true,
    swaggerjson: true,

    "graphql/*": true,
};
