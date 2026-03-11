/* eslint-disable eqeqeq */
module.exports = {
    inputs: {},

    exits: {
        success: {},
        invalid: {},
        badRequest: {},
    },

    fn: async function (inputs, exits) {
        function random() {
            const time = ["createdAt", "id"];
            const order = ["asc", "desc"];
            const randomForTime = time[Math.random().toFixed(1) < 0.5 ? 0 : 1];
            const randomForOrder = order[Math.random().toFixed(1) < 0.5 ? 0 : 1];

            return `${randomForTime} ${randomForOrder}`;
        }
        return exits.success(random());
    },
};
