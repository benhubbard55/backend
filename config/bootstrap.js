// // module.exports.bootstrap = async function() {};


// /**
//  * Bootstrap
//  * (sails.config.bootstrap)
//  *
//  * An asynchronous bootstrap function that runs before your Sails app gets lifted.
//  * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
//  *
//  * For more information on bootstrapping your app, check out:
//  * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
//  */
// var async = require("async");
// var Job = require("kue").Job;
// module.exports.bootstrap = async function (cb) {
//   // It's very important to trigger this callback method when you are finished
//   // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
//   //cb();

//   //////////////////////
//   // Async bootstrapping
//   //////////////////////
//   //console.log("Inside bootstrap");
//   process.env.TZ = "UTC";

//   async.series(
//     [
//       /**
//        * Setup the emailTemplate (Mailer.template) service
//        */

//       //        function (cb) {
//       //            //console.log(require("email-templates"));
//       //            require("email-templates")(sails.config.paths.views + '/email', function (err, template) {
//       //
//       //                //console.log(err);
//       //                //console.log(template);
//       //                if (err)
//       //                    sails.log.warn(err);
//       //
//       //                Mailer.template = template;
//       //                //console.log(Mailer);
//       //                cb();
//       //            });
//       //        },
//       /**
//        * Setup Kue
//        */


//     ],
//     function () {
//       ////////////////////////////////
//       // All bootstrapping is finished
//       ////////////////////////////////

//       // If this is a worker instance, execute startWorker
//       // callback to skip starting the server
//       //   if (sails.config.worker) {
//       //     return startWorker();
//       //   }
//       //startWorker();
//       // If this is a normal Sails instance,
//       // execute the callback to start the server
//       cb();
//     }
//   );
// };



// /**
//  * Start job processors by invoking
//  * Jobs.process() on each one of them
//  */



// /**
//  * Global startWorker callback that will kick off the worker instance
//  *
//  * This must be executed from within bootstrap.js if
//  * sails.config.worker is set to true
//  */

module.exports.bootstrap = async function (cb) {
    // require('dotenv').config()

    // console.log(process.env)
    cb()
}