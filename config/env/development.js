require("dotenv").config();

const {
    BASE_URL,
    MODE,
    SITE_NAME,
    SORT_NAME,
    COPY_RIGHT_YEAR,
    SENDER_EMAIL,
    SENDER_EMAIL_PASSWORD,
    SENDER_EMAIL_HOST,
    SENDER_EMAIL_PORT,
    SENDER_EMAIL_SECURE,
    SENDER_EMAIL_NAME,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    DATABASE_HOST,
    DATABASE_PORT,
    TESTMODE, // add this
    DATABASE_NAME,
    OTP_IS_SEND,
    OTP_DEFAULT_OTP,
    OTP_VALIDITY,
    TEST_DATABASE_NAME
} = process.env;

const APP_BASE_URL = BASE_URL;

const isTestMode = TESTMODE === 1;

console.log("---> test", TESTMODE, isTestMode, typeof (TESTMODE))

const dbUsername = isTestMode ? TEST_DATABASE_NAME : DATABASE_NAME;

module.exports = {
    mode: MODE,
    siteName: process.env.SITE_NAME,
    shortName: process.env.SORT_NAME,
    copyRightYear: COPY_RIGHT_YEAR,
    redis_url: "redis://127.0.0.1:6379",

    mail: {
        email: SENDER_EMAIL,
        password: SENDER_EMAIL_PASSWORD,
        host: SENDER_EMAIL_HOST,
        port: SENDER_EMAIL_PORT,
        secure: SENDER_EMAIL_SECURE == "true", // true for 465, false for other ports
        from: {
            name: SENDER_EMAIL_NAME,
            email: SENDER_EMAIL,
        },
        to: {
            name: "",
            email: SENDER_EMAIL,
        },
    },
    datastores: {
        default: {
            adapter: require("sails-mysql"),
            timezone: "UTC",
            dateStrings: true,
            charset: "utf8mb4",
            collation: "utf8mb4_general_ci",
            url: `mysql://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${dbUsername}`,
        },
    },
    models: {
        migrate: "safe",
    },
    custom: {
        baseUrl: APP_BASE_URL,
        imageUplaodPath: process.env.CUSTOM_IMAGE_UPLOAD_PATH,
        tempImageUploadPath: process.env.CUSTOM_IMAGE_UPLOAD_TEMPORARY_PATH,
        imageRetrieveUrl: process.env.CUSTOM_IMAGE_RETRIEVE_PATH,

        OTP: {
            is_send: OTP_IS_SEND == "true",
            defaultOtp: OTP_DEFAULT_OTP,
            validty: OTP_VALIDITY,
        },

        PATH: {
            USER_IMAGE_PATH: process.env.CUSTOM_PATH_USER_IMAGE_PATH,
            USER_CHAT_MEDIA_PATH: process.env.CUSTOM_PATH_USER_CHAT_MEDIA_PATH,
            STORY_IMAGE_PATH: process.env.CUSTOM_PATH_STORY_IMAGE_PATH,
            STORY_VIDEO_PATH: process.env.CUSTOM_PATH_STORY_VIDEO_PATH,
        },
    },
    firebase: {
        type: process.env.FIREBASE_TYPE,
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: process.env.FIREBASE_AUTH_URI,
        token_uri: process.env.FIREBASE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
        universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN
    },

    url: {
        appURL: APP_BASE_URL,
        applicationURL: APP_BASE_URL,
        imagePath: `${APP_BASE_URL}/uploads/`,
    },
};
