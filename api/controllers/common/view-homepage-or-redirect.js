module.exports = {
    friendlyName: "View homepage or redirect",

    description:
        "Display or redirect to the appropriate homepage, depending on login status.",

    exits: {
        redirect: {
            responseType: "redirect",
        },
    },

    fn: async function (inputs, exits) {
        if (this.req.session.adminId) {
            return exits.redirect("admin/dashboard");
            //   throw { redirect: 'admin/dashboard'  };
        }
        return exits.redirect("admin/login");
        // throw { redirect: 'admin/login' };
    },
};
