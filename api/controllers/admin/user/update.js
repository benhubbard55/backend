module.exports = {
    friendlyName: "Update profile",
    inputs: {
        name: {
            type: "string",
            required: true,
        },
        // email: {
        //     required: true,
        //     isEmail: true,
        //     type: "string",
        // },
        // phoneNo: {
        //     type: "string",
        //     required: true,
        // },
        // countryCode: {
        //     type: "string",
        //     required: true,
        // },
    },
    exits: {
        redirect: {
            responseType: "redirect",
        },
    },
    fn: async function (inputs, exits) {
        await sails.helpers.updateUser.with({ ...inputs, req: this.req });
        throw {
            redirect: "/admin/users",
        };
    },
};
