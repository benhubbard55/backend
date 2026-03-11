module.exports.models = {
    migrate: "safe",
    attributes: {
        createdAt: { type: "ref", autoCreatedAt: true, columnType: "datetime" },
        updatedAt: { type: "ref", autoUpdatedAt: true, columnType: "datetime" },
        id: { type: "number", autoIncrement: true },
    },

    dataEncryptionKeys: {
        default: "Cm+X/HXjW4+XFlNBwkN40Dm3kRgDdDcbKukrB+9vi94=",
    },

    cascadeOnDestroy: true,
};
