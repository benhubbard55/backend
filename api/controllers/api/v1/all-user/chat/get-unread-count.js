module.exports = {
    friendlyName: "Subscribe group",
    description: "",
    inputs: {},
    exits: {
        normalError: sails.config.globals.statusCodes.normalError,
    },

    fn: async function (inputs, exits) {
        var req = this.req;

        var getUnreadCountQuery = `SELECT gms.groupId AS unreadCount, COUNT(gms.id) AS unreadCount FROM groupMessageStatus AS gms 
        WHERE gms.receiverId=$1 AND status IN('sent','deliver') 
        GROUP BY gms.groupId`;

        const getUnreadCountQueryValues = [req.loggedInUser.id];
        var getUnreadCountData = await sails.sendNativeQuery(
            getUnreadCountQuery,
            getUnreadCountQueryValues
        );
        getUnreadCountData = getUnreadCountData.rows;

        return exits.success({
            status: true,
            message: sails.__("Fetch data successfully"),
            data: {
                unreadCount: getUnreadCountData.length,
            },
        });
    },
};
