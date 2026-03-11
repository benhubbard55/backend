module.exports = {
    friendlyName: "Get  genre type",
    inputs: {},
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
    },
    fn: async function (inputs, exits) {
        // const data = await sails.helpers.getPaginationList.with({
        //     request: this.req,
        //     modelName: "MusicType",
        //     whereCondition: { isActive: true },
        //     selectItems: ["genreName"],
        // });        

        var data = await MusicType.find({ isActive: true });
        if (data) {
            if (data.length > 0) {
                data = data.map(({ id, genreName }) => ({ id, genreName }));
            }
            return exits.success(data);
        } else {
            return exits.invalid(data);
        }
    },
};
