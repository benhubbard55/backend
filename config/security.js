// module.exports.security = {
//     allRoutes: true,
//     allowOrigins: '*',
//     allowCredentials: false,
//     allowRequestHeaders: 'content-type,accept,authorization, origin,x-requested-with, Access-Control-Request-Method, Access-Control-Request-Headers,Access-Control-Allow-Origin',
//     allowRequestMethods: 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD',
//     allowAnyOriginWithCredentialsUnsafe: true
// };

module.exports.security = {
    cors: {
        allRoutes: true,
        allowOrigins: ['http://localhost:3000', 'https://uphony.net', 'http://3.132.91.77:3000'],
        allowCredentials: true,
        allowRequestHeaders: 'content-type, authorization',
    },
    // csrf: false
};
