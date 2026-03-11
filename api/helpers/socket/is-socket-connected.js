module.exports = {
    friendlyName: 'Is socket connected',
    description: '',
    inputs: {
        id: {
            type: 'number',
            required: true,
            description: 'User id'
        }
    },
    exits: {

    },
    fn: async function (inputs, exits) {
        var socketRoomName = User.getRoomName(inputs.id);

        sails.io.in(socketRoomName).clients((err, clients) => {
            if (err) {
                return exits.success(false);
            }

            if (clients && Array.isArray(clients) && clients.length > 0) {
                return exits.success(true);
            } else {
                return exits.success(false);
            }
        });
    }
};
