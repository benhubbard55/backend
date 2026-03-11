module.exports = {
    friendlyName: "Edit",
    description: "Edit admin.",
    inputs: {},
    exits: {
        success: {
            viewTemplatePath: "admin/admin-crud/edit",
        },
        redirect: {
            responseType: "redirect",
        },
    },

    fn: async function (inputs, exits) {
        var adminId = this.req.params["adminId"];

        var adminRecord = await Admin.findOne({
            id: adminId,
        });
        return exits.success({
            adminRecord: adminRecord,
        });
    },
};
