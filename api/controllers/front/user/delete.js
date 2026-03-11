module.exports = {
    friendlyName: "Delete",

    description: "Delete User.",

    inputs: {},

    exits: {
        success: {
            description: "User Deleted.",
        },
        redirect: {
            responseType: "redirect",
        },
    },

    fn: async function (inputs, exits) {
        var user_id = this.req.params["id"];

        var userRecord = await User.destroy({
            id: user_id,
        });
        exits.success();
    },
};
