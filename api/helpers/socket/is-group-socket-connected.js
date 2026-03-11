module.exports = {
    friendlyName: 'Is group socket connected',
    description: '',
    inputs: {
        id: {
            type: 'number',
            required: true,
            description: 'User id'
        },
        groupId: {
            type: 'number',
            required: true,
            description: 'Group id'
        }
    },
    exits: {
        success: {
            description: 'All done.',
        },
    },

    fn: async function (inputs, exits) {

        var subscribeGroup = await ChatGroupMember.findOne({ chatGroupId: inputs.groupId, memberId: inputs.id });
        if (subscribeGroup) {
            var socketRoomName = ChatGroupMember.getRoomName(subscribeGroup.id);

            sails.io.in(socketRoomName).clients((err, clients) => {
                if (err) {
                    return exits.success({
                        id: subscribeGroup.id,
                        status: false
                    });
                }

                if (clients && Array.isArray(clients) && clients.length > 0) {
                    return exits.success({
                        id: subscribeGroup.id,
                        status: true
                    });
                } else {
                    return exits.success({
                        id: subscribeGroup.id,
                        status: false
                    });
                }
            });
        } else {
            return exits.success({
                id: 0,
                status: false
            });
        }

    }
};

