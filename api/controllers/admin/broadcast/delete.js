module.exports = {
    friendlyName: 'Delete',
    description: 'Delete BroadCast.',
    inputs: {
    },
    exits: {
        success: {
            description: 'BroadCast Deleted.',
        },
        redirect: {
            responseType: 'redirect'
        }
    },

    fn: async function (inputs, exits) {
        var broadcastId = this.req.params['id'];
        await BroadCast.destroy({
            id: broadcastId
        });
        return exits.success({
            message: "Deleted successfully"
        })
    }
};
