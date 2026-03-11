global.serverErrorMsg = "!!Oops, Something has gone wrong";
global.moment = require("moment");
require("dotenv").config();

global.paymentStatus = {
    APPROVED: "approved",
    PENDING: "pending",
    COMPLETED: "completed",
    CANCELED: "canceled",
    FAILED: "failed",
};

global.forgotOtpLinkExpireMessage = "The OTP link has expired. Please generate a new link to continue"

const Stripe = require('stripe');
const stripeKey = process.env.TESTMODE == 0 ? process.env.STRIPE_API_KEY : process.env.STRIPE_API_TEST_KEY
global.stripeSDK = Stripe(stripeKey);