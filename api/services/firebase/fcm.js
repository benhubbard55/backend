// const FCM = require("fcm-node");

// var fcm = new FCM(serverKey);

var fcm = require("fcm-notification");
var FCM = new fcm(sails.config.firebase);
module.exports = FCM;
