module.exports = {
    friendlyName: "report-user",
    inputs: {
        reportTo: {
            type: "number",
            required: true,
        },
        musicId: {
            type: "number",
            required: false,
        },
        reason: {
            type: "string",
            required: true,
        },
    },
    exits: {
        success: sails.config.globals.statusCodes.success,
        invalid: sails.config.globals.statusCodes.invalid,
        notFound: sails.config.globals.statusCodes.notFound,
    },
    fn: async function (inputs, exits) {
        try {
            const loginUserData = this.req.loggedInUser;
            const findUser = await User.findOne({ id: inputs.reportTo, isDeleted: false, isActive: true });
            if (!findUser) {
                return exits.invalid({
                    status: false,
                    message: "invalid user",
                });
            }
            if (inputs?.musicId) {
                const findMusic = await Music.findOne({ id: inputs.musicId })
                if (findMusic?.userId == loginUserData?.id || !findMusic) {
                    return exits.invalid({
                        status: false,
                        message: "invalid Music",
                    });
                }
            }

            await ReportUser.create({
                reportBy: loginUserData?.id,
                reportTo: inputs.reportTo,
                musicId: inputs.musicId,
                reason: inputs.reason
            });

            return exits.success({
                status: true,
                message: "Report submitted successfully.",
            });
        } catch (error) {
            return exits.invalid({
                status: false,
                message: serverErrorMsg,
            });
        }
    },
};
