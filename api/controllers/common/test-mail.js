module.exports = {
    friendlyName: "Test mail",

    description: "",

    inputs: {
        emailAddress: {
            description:
                "The email address of the alleged user who wants to recover their password.",
            example: "rydahl@example.com",
            type: "string",
        },
    },

    exits: {
        showTemplate: {
            responseType: "view",
            viewTemplatePath: "emails/test-view",
        },
    },

    fn: async function (inputs, exits) {
        let mailStatus = await sails.helpers.sendEmail.with({
            to: "niravjadatiya@gmail.com",
            subject: "Your account has been updated",
            template: "email-verify-new-email",
            typeOfSend: "preview", // 'now', 'queue', 'preview'
            layout: "layout-email",
            templateData: {
                fullName: "Nirav Adatiya",
                token: "my Token",
            },
        });

        if (
            mailStatus &&
            mailStatus.typeOfSend &&
            mailStatus.typeOfSend == "preview"
        ) {
            return exits.showTemplate({
                emailHtmlStream: mailStatus.emailHtmlStream,
            });
        }
        return exits.success(mailStatus);
    },
};
