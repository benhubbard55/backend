module.exports = {
    friendlyName: "Login",
    inputs: {},
    exits: {
        success: {
            description: "The requesting user agent has been successfully logged in.",
        },
        redirect: {
            description: "The requesting user is already logged in.",
            responseType: "redirect",
        },
    },

    fn: async function (inputs, exits, req, res) {
        this.req.session.destroy();
        throw { redirect: "/admin" };
    },
};
