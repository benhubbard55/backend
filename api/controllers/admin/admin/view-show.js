module.exports = {
    friendlyName: "Show",
    description: "Show user.",
    inputs: {},
    exits: {
        success: {
            viewTemplatePath: "admin/admin-crud/show",
        },
        // redirect: {
        //     responseType: "redirect",
        // },
    },

    fn: async function (inputs, exits) {
        var userId = this.req.params["adminId"];

        let findUser = await Admin.findOne({ id: userId });

        return exits.success({
            userRecord: findUser || {},
        });
    },
};
