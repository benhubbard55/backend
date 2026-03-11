module.exports = {
    friendlyName: "Data seeder",

    description: "",

    inputs: {},

    exits: {},

    fn: async function (inputs, exits) {
        var admin = await Admin.find();
        if (admin.length == 0) {
            await Admin.create({
                firstName: "Super",
                lastName: "Admin",
                email: "admin@admin.com",
                password:
                    "$2a$10$4Nc8PvwLgiJWcE4mcibv9uIpdlz7yYbu2wkpQXkdyhFbjzlwZOYBS",
            });
        }
        var SQL = `
              ALTER TABLE public."PermissionRole"
              ADD CONSTRAINT fk_role_index FOREIGN KEY ("role")
              REFERENCES public."Role" (id)
              ON UPDATE CASCADE ON DELETE CASCADE;

              ALTER TABLE public."PermissionRole"
              ADD CONSTRAINT fk_permission_index FOREIGN KEY ("permission")
              REFERENCES public."Permission" (id)
              ON UPDATE CASCADE ON DELETE CASCADE;


              ALTER TABLE public."UserRole"
              ADD CONSTRAINT fk_role_index FOREIGN KEY ("role")
              REFERENCES public."Role" (id)
              ON UPDATE CASCADE ON DELETE CASCADE;

              ALTER TABLE public."UserRole"
              ADD CONSTRAINT fk_user_index FOREIGN KEY ("user")
              REFERENCES public."User" (id)
              ON UPDATE CASCADE ON DELETE CASCADE;`;

        await sails.getDatastore().sendNativeQuery(SQL, []);

        exits.success();
    },
};
