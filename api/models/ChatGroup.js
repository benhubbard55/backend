module.exports = {
    tableName: "chatGroups",
    fetchRecordsOnUpdate: true,
    fetchRecordsOnCreate: true,
    fetchRecordsOnDestroy: true,
    attributes: {
        title: {
            type: "string",
            required: false,
            allowNull: true,
        },
        secretId: {
            type: "string",
            allowNull: true,
        },
        creatorId: {
            model: "User",
            required: false,
        },
        userId: {
            // required if chat type is direct chat
            model: "User",
            required: false,
        },
        lastMsgId: {
            model: "Chat",
            required: false,
        },
        type: {
            type: "string",
            isIn: ["direct", "group"],
            defaultsTo: "group",
        },
        isDeletedFromUserSide: {
            type: "boolean",
            defaultsTo: false,
        },
        isDeletedFromCreatorSide: {
            type: "boolean",
            defaultsTo: false,
        },
        removeFromGroupTimeForUserSide: {
            type: "ref",
            columnType: "datetime",
        },
        removeFromGroupTimeForCreatorSide: {
            type: "ref",
            columnType: "datetime",
        },
        // groupMembers: {
        // 	collection: 'user',
        // 	via: 'chatGroupId',
        // 	through: 'ChatGroupMember'
        // },
    },

    afterCreate: async function (valuesToSet, proceed) {
        await ChatGroupMember.createEach([
            {
                chatGroupId: valuesToSet.id,
                memberId: valuesToSet.creatorId,
            },
            {
                chatGroupId: valuesToSet.id,
                memberId: valuesToSet.userId,
            },
        ]);
        return proceed();
    },
};
