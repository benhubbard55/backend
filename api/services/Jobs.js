/**
 * Kue job queue holder
 *
 * Queue will be loaded into this object in bootstrap.js
 */
module.exports = {
    _processors: {
        sendInviteSMS: function (job, cb) { },
        demoJob: function (job, cb) {
            console.error("Job,job is done", job.data.priority);
            cb();
        },

        createStripCustomer: async function (job, cb) {
            const data = await sails.helpers.stripe.createCustomer.with({
                name: job?.data?.name,
                email: job?.data?.email,
                phoneNo: job?.data?.phoneNo,
            });
            await User.update({
                id: job.data.userId,
            }).set({
                otp: null,
                isVerified: true,
                customerId: data?.status ? data?.id : null,
            });

            cb();
        },

        createStripAccount: async function (job, cb) {
            const data = await sails.helpers.stripe.createAccount.with({
                email: job.data.email,
            });

            if (data?.status) {
                await User.update({
                    id: job.data.userId,
                }).set({
                    otp: null,
                    isVerified: true,
                    accountId: data?.id || null,
                });
            }
            cb();
        },

        sendMail: function (job, cb) {
            Mailer.sendMail(job.data.mainOptions, function (err, info) {
                if (err) {
                    console.log(err);
                    cb(err);
                }
                cb();
            });
        },
    },
};
