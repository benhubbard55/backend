require('dotenv').config();
const isTestMode = process.env.TESTMODE;
module.exports = {
    development: {
        client: 'mysql',
        connection: {
            database: isTestMode == 0 ? 'uphony' : 'uphony_testMode',
            user: 'root',
            password: 'root',
            host: 'localhost'
        }
    },

    staging: {
        client: "mysql",
        connection: "mysql://root:6jdFZeIBavsXCzuC@localhost:3306/uphony",
    },
    production: {
        client: "mysql",
        connection: isTestMode == 0 ? "mysql://root:kr0FzunfGv82XgP@localhost:3306/uphony" : "mysql://root:kr0FzunfGv82XgP@localhost:3306/uphony_testMode",
    },
};
