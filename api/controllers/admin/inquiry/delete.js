module.exports = {
    inputs: {},
    exits: {
        success: {},
        redirect: {
            responseType: "redirect",
        },
    },

    fn: async function (inputs, exits) {
        var inquiryId = this.req.params["id"];
        await Inquiry.destroy({
            id: inquiryId,
        });
        return exits.success({
            message: "Deleted successfully",
        });
    },
};
