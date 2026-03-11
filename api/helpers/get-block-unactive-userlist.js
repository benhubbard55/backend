module.exports = {
    friendlyName: 'Get blocked user IDs',

    description: 'Fetch all user IDs blocked by or blocking the current user.',

    inputs: {
        userId: {
            type: 'string',
            required: true,
        },
    },

    fn: async function (inputs) {
        const blockedUsers = await BlockUser.find({
            or: [
                { blockBy: inputs.userId },
                { blockTo: inputs.userId }
            ]
        });

        const blockedUserIds = blockedUsers.map(bu =>
            bu.blockBy === inputs.userId ? bu.blockTo : bu.blockBy
        );
        const unActiveUsers = await User.find({
            where: {
                or: [
                    { isDeleted: true },
                    { isActive: false },
                ]
            }
        });

        const activeUserIds = unActiveUsers.map(u => u.id);
        const mergedIds = Array.from(new Set([...blockedUserIds, ...activeUserIds]));
        return mergedIds;        
    }
};
