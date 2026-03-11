module.exports = {
    inputs: {
        tax: {
            type: "number",
            required: true,
        },
        keyName: {
            type: "string",
            required: true,
        }
    },
    exits: {
        redirect: {
            responseType: "redirect",
        },
    },
    fn: async function (inputs, exits) {
        try {
            const createTax = await PaymentSetting.create({
                tax: inputs.tax,
                keyName: inputs.keyName
            });
            if (createTax) {
                this.req.session.flash = {
                    type: "success",
                    message: "Tax added successfully",
                };
            } else {
                this.req.session.flash = {
                    type: "error",
                    message: "Tax not added",
                };
            }
        } catch (error) {
            this.req.session.flash = {
                type: "error",
                message: serverErrorMsg,
            };
        } finally {
            throw {
                redirect: "/admin/payment-setting",
            };
        }
    },
};
