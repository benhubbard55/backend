/**
 * Node Mailer service and setup
 */

var sails = require("sails");
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
// module.exports = nodemailer.createTransport('smtps://ankurgarach4%40gmail.com:garachankur4@smtp.gmail.com');

if (
    sails &&
    sails.config &&
    (sails.config.mode === "development" || sails.config.mode === "staging")
) {
    // create reusable transporter object using the default SMTP transport
    module.exports = nodemailer.createTransport({
        host: sails.config.mail.host,
        port: Number(sails.config.mail.port),
        secure: sails.config.mail.secure === "true", // true for 465, false for other ports
        auth: {
            user: sails.config.mail.email, // generated ethereal user
            pass: sails.config.mail.password, // generated ethereal password
        },
    });
} else if (sails && sails.config && sails.config.mode === "production") {
    module.exports = nodemailer.createTransport(
        smtpTransport({
            host: sails.config.mail.host,
            port: sails.config.mail.port,
            secure: sails.config.mail.secure, // true for 465, false for other ports
            auth: {
                user: sails.config.mail.email, // generated ethereal user
                pass: sails.config.mail.password, // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false,
            },
        })
    );
}
