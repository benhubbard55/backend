module.exports = {
    tableName: "users",
    fetchRecordsOnCreate: true,
    fetchRecordsOnUpdate: true,
    fetchRecordsOnDestroy: true,
    attributes: {
        userType: {
            type: "number",
            isIn: [1], // 1 for user, 2 for artist
            defaultsTo: 1
        },
        name: {
            type: "string",
            required: true,
        },
        email: {
            type: "string",
            allowNull: true,
        },
        password: {
            type: "string",
            protect: true,
            allowNull: true,
        },
        phoneNo: {
            type: "string",
            allowNull: true,
        },
        countryCode: {
            type: "string",
            allowNull: true,
        },
        otp: {
            type: "string",
            allowNull: true,
        },
        profileImage: {
            type: "string",
            allowNull: true,
        },
        isDeleted: {
            type: "boolean",
            defaultsTo: false,
        },
        verificationToken: {
            type: "string",
            allowNull: true,
        },
        isVerified: {
            type: "boolean",
            defaultsTo: false,
        },
        forgotTime: {
            type: "string",
            allowNull: true,
        },
        socketId: {
            type: "string",
            allowNull: true,
        },
        isUserOnline: {
            type: "boolean",
            defaultsTo: false,
        },
        customerId: {
            type: "string",
            allowNull: true,
        },
        balance: {
            type: "number",
            defaultsTo: 0,
        },
        isActive: {
            type: "boolean",
            defaultsTo: true,
        },
        followCount: {
            type: "number",
            defaultsTo: 0,
        },
        followingCount: {
            type: "number",
            defaultsTo: 0,
        },
        accountId: {
            type: "string",
            allowNull: true,
        },
        isPendingUnReadNotification: {
            type: "boolean",
            defaultsTo: false,
        }
    },
    customToJSON: function () {
        if (this.profileImage) {
            this.profileImage =
                sails.config.custom.baseUrl +
                sails.config.globals.imagePath.USER_PROFILE_DISPLAY_IMAGE_PATH +
                "/" +
                this.profileImage;
        } else {
            this.profileImage = null;
        }

        return _.omit(this, ["password"]);
    },

    beforeCreate: async function (valuesToSet, proceed) {
        if (valuesToSet.password) {
            await sails.helpers.passwords
                .hashPassword(valuesToSet.password)
                .exec((err, hashedPassword) => {
                    if (err) {
                        return proceed(err);
                    }
                    valuesToSet.password = hashedPassword;
                    valuesToSet.verificationToken =
                        sails.helpers.strings.random("url-friendly");
                    if (valuesToSet.email) {
                        valuesToSet.email = valuesToSet.email.trim().toLowerCase();
                        return proceed();
                    }
                    return proceed();
                });
        }
    },

    beforeUpdate: async function (valuesToSet, proceed) {
        if (valuesToSet.password) {
            await sails.helpers.passwords
                .hashPassword(valuesToSet.password)
                .exec((err, hashedPassword) => {
                    if (err) {
                        return proceed(err);
                    }
                    valuesToSet.password = hashedPassword;
                    if (valuesToSet.email) {
                        valuesToSet.email = valuesToSet.email.trim().toLowerCase();
                        return proceed();
                    }
                    return proceed();
                });
        } else {
            return proceed();
        }
    },
};
