module.exports = {
    inputs: {},

    fn: async function (inputs, exits) {
        return exits.success({ musicType: await MusicType.find({}) });
    },
};
