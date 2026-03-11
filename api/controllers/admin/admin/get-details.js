module.exports = {
    inputs: {},

    fn: async function (inputs, exits) {
        let result = await Admin.findOne({
            id: this.req.session.adminId
        })
        return exits.success(result || {});
    },
};
