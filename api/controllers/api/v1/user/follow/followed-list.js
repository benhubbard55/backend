module.exports = {
    friendlyName: "Follower list",
    inputs: {
        userId: {
            type: "number",
            required: true,
        },
        followType: {
            type: "number",  // 1 then followList 2 then followingList
            required: true,
        },
    },
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
    },
    fn: async function (inputs, exits) {
        const loginUserData = this.req.loggedInUser;
        const { userId, followType } = inputs;

        const blockedUserIds = await sails.helpers.getBlockUnactiveUserlist(loginUserData?.id);        

        const filter = (followType === 1)
            ? { followedTo: userId, followedBy: { nin: blockedUserIds } }
            : { followedBy: userId, followedTo: { nin: blockedUserIds } };

        const data = await sails.helpers.getPaginationList.with({
            request: this.req,
            modelName: "Follower",
            whereCondition: filter,
            populate: followType === 1 ? ["followedTo"] : ["followedBy"],
        });

        if (data.status) {
            return exits.success(data);
        } else {
            return exits.invalid(data);
        }
    },
};

// module.exports = {
//     friendlyName: "Follower list",
//     inputs: {},
//     exits: {
//         success: sails.config.globals.statusCodes.success,
//         invalid: sails.config.globals.statusCodes.invalid,
//     },
//     fn: async function (inputs, exits) {
//         const loginUserData = this.req.loggedInUser;

//         const data = await sails.helpers.getPaginationList.with({
//             request: this.req,
//             modelName: "Follower",
//             whereCondition: { followedBy: loginUserData?.id },
//             populate: ["followedTo"],
//         });

//         if (data.status) {
//             return exits.success(data);
//         } else {
//             return exits.invalid(data);
//         }
//     },
// };
