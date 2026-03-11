/**
 * app.js
 *
 * Use `app.js` to run your app without `sails lift`.
 * To start the server, run: `node app.js`.
 *
 * This is handy in situations where the sails CLI is not relevant or useful,
 * such as when you deploy to a server, or a PaaS like Heroku.
 *
 * For example:
 *   => `node app.js`
 *   => `npm start`
 *   => `forever start app.js`
 *   => `node debug app.js`
 *
 * The same command-line arguments and env vars are supported, e.g.:
 * `NODE_ENV=production node app.js --port=80 --verbose`
 *
 * For more information see:
 *   https://sailsjs.com/anatomy/app.js
 */


// Ensure we're in the project directory, so cwd-relative paths work as expected
// no matter where we actually lift from.
// > Note: This is not required in order to lift, but it is a convenient default.
process.chdir(__dirname);
require('dotenv').config();

var sails;
var rc;
var AWS = require('aws-sdk');

// Function to load AWS secrets
async function loadSecrets() {
    const secretsManager = new AWS.SecretsManager({ region: 'us-east-2' });
    const secretName = 'uphony/env'; // Your secret name

    try {
        const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();

        let secrets = {};
        if ('SecretString' in data) {
            secrets = JSON.parse(data.SecretString);
        } else {
            const buff = Buffer.from(data.SecretBinary, 'base64');
            secrets = JSON.parse(buff.toString('ascii'));
        }

        // Set secrets to process.env
        Object.keys(secrets).forEach(key => {
            process.env[key] = secrets[key];
        });
        console.log('Secrets successfully set to process.env');

    } catch (err) {
        console.error('Failed to load secrets from AWS Secrets Manager:', err);
        // process.exit(1); // Exit if secrets loading fails
    }
}

// Load secrets before starting the Sails application
loadSecrets().then(() => {
    console.log('Secrets successfully loaded, now lifting Sails...');  // Log before lifting the app

    try {
        sails = require('sails');
        rc = require('sails/accessible/rc');
    } catch (err) {
        console.error('Error requiring Sails:', err);
        process.exit(1);  // Exit if Sails can't be loaded
    }

    // Start the server after loading secrets
    sails.lift(rc('sails'), function () {
        console.log("Sails app is now running...");  // Log after app is lifted
    });
}).catch((err) => {
    console.error('Error loading secrets:', err);  // Log if there is an issue loading secrets
    process.exit(1);  // Exit if there's any error loading the secrets
});