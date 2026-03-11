// var fs = require("fs");
// process.on('uncaughtException', function(er) {

// 	sails.log("--------------- " + sails.config.siteName + " error -----------------");
// 	sails.log(er.stack);

// 	sails.log("development error", er);
// 	sails.log("name =", sails.config.mail.from.name);

// 	fs.writeFile('error.txt', er.stack, function(err) {
// 		sails.log('complete');
// 	});

// 	var message = {
// 		to: sails.config.mail.to.email,
// 		subject: sails.config.siteName + " Error",
// 		html: '<p>' + er.stack + '</p>'
// 	};

// 	Mailer.sendMail(message, function(err, result) {
// 		sails.log("err", err);
// 		sails.log("result", result);
// 		cb(null, result, message);
//         process.exit(1);
// 	});

// 	// throw new Error('whoops');
// 	// process.send();
// 	// process.kill(process.pid, 'uncaughtException');
// 	// func();
// });

// // fs.readFile('somefile.txt', function(err, data) {
// // 	if (err) {
// // 		sails.log(err);
// // 		throw err;
// // 	}
// // 	sails.log("data", data);
// // });