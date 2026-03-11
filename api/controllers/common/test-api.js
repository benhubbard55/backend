module.exports = {
    friendlyName: "Test job",

    description: "",

    inputs: {
        email: {
            type: "string",
        },
    },

    exits: {},

    fn: async function (inputs, exits) {
        // const data = await sails.helpers.addNotification.with({
        //     senderId: 1,
        //     receiverId: 1,
        //     notificationType: "new test",
        //     title: "good",
        //     description: "very good",
        // })
        // console.log("call");
        // const data = await sails.helpers.sendEmail.with({
        //     to: "princebhut@logisticinfotech.co.in",
        //     subject: "Verification Code",
        //     template: "email-register-otp",
        //     typeOfSend: "now", // 'now', 'queue', 'preview'
        //     layout: "layout-email",
        //     templateData: {
        //         name: "findEmail?.name",
        //         otp: "otp",
        //     },
        // });
        // const data = await sails.helpers.getPaginationList.with({
        //     request: this.req,
        //     modelName: "Notification",
        //     populate: ["receiverId"]
        // });
        await sails.helpers.sendEmail.with({
            to: "princebhut@logisticinfotech.co.in",
            subject: "New Update",
            template: "email-broadcast",
            typeOfSend: "queue", // 'now', 'queue', 'preview'
            layout: "layout-email",
            templateData: {
                title: "title",
                description: "description",
            },
        });

        // create payment intent
        // const data = await sails.helpers.stripe.createPaymentIntent.with({
        //     amount: 500,
        //     customerId: "cus_Qv2KE4tGrZkQgG",
        //     cardId: "pm_card_mastercard"
        // });

        // capture payment intent
        // const data = await sails.helpers.stripe.capturePaymentIntent.with({
        //     paymentIntentId: "pi_3Q3bZ1P2Fr5cxAgD16G2b9NE"
        // });

        // create payout to bank account
        // const data = await sails.helpers.stripe.createPayout.with({
        //     amount: 100,
        //     bankToken: "btok_us_verified",
        // });
        // await User.update({}).set({
        //     customerId: null,
        // });
        // const data = await sails.helpers.stripe.createAccount.with({
        //     email: inputs?.email
        // });
        // const data = this.req;
        // console.log("object :>> ", this.req.ip);
        const ip =
            sails.config.mode === "development"
                ? "192.168.0.0"
                : inputs.req.ip.split(":").pop();
        console.log('ip :>> ', ip);
        await sails.helpers.sendEmail.with({
            to: "princebhut@logisticinfotech.co.in",
            subject: "Thank You for Reaching Out!",
            template: "email-inquiry",
            typeOfSend: "queue", // 'now', 'queue', 'preview'
            layout: "layout-email",
            templateData: {
                name: "findEmail?.name",
            },
        });
        return exits.success("data", ip);
    },
};
