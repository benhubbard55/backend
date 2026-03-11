module.exports = {
    inputs: {
        name: {
            type: "string",
            required: true,
        },
        email: {
            type: "string",
            required: true,
        },
        phoneNo: {
            type: "string",
            required: true,
        },
        message: {
            type: "string",
            required: true,
        },
    },
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
    },

    fn: async function (inputs, exits) {
        try {
            await Inquiry.create(inputs);

            await sails.helpers.sendEmail.with({
                to: inputs.email,
                subject: "Thank You for Reaching Out!",
                template: "email-inquiry",
                typeOfSend: "queue", // 'now', 'queue', 'preview'
                layout: "layout-email",
                templateData: {
                    name: inputs.name,
                },
            });

            return exits.success({
                status: true,
                message: "We will contact you soon",
            });
        } catch (error) {
            return exits.invalid({
                status: false,
                message: serverErrorMsg,
                error: error,
            });
        }
    },
};
