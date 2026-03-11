module.exports = {
    inputs: {
        tax: {
            type: "number",
            required: true,
        },
        keyName: {
            type: "string",
            required: true,
        },
    },
    exits: {
        redirect: {
            responseType: "redirect",
        },
    },
    fn: async function (inputs, exits) {
        try {
            const updateTax = await PaymentSetting.updateOne({
                id: this.req.params["id"],
                keyName: inputs.keyName,
            }).set({
                tax: inputs.tax,
            });
            if (updateTax) {
                this.req.session.flash = {
                    type: "success",
                    message: "Update successfully",
                };
            } else {
                this.req.session.flash = {
                    type: "error",
                    message: "Update not updated",
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
