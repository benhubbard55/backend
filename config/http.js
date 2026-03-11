module.exports.http = {
    middleware: {
        order: [
            "cookieParser",
            "session",
            "bodyParser",
            "compress",
            "poweredBy",
            "router",
            "www",
            "favicon",
        ],
        bodyParser: require('skipper')({
            maxWaitTimeBeforePassingControlToApp: 1000000,
            maxTimeToBuffer: 10000,
        }),
    },
    trustProxy: true,
    serverOptions: {
        timeout: 1200000, // 20 minutes
    },
};
