module.exports = {
    friendlyName: "Menu helper",
    description: "",
    inputs: {
        email: {
            type: "string",
            required: false,
        },
    },
    exits: {
        success: {
            description: "All done.",
        },
    },

    fn: async function (inputs, exits) {
        let otp;
        const sendOtp = await sails.config.custom.OTP.is_send;
        if (sendOtp) {
            const generateOtp = Math.floor(100000 + Math.random() * 900000);
            otp = generateOtp;
        } else {
            otp = await sails.config.custom.OTP.defaultOtp;
        }
        return exits.success({
            otp: otp,
        });
    },
};
