module.exports = {
	friendlyName: "View user create",
	description: 'Display "User Create" page.',
	exits: {
		success: {
			viewTemplatePath: "admin/user/create",
		},
	},

	fn: async function (inputs, exits) {
		let roleList = await Role.find({ name: { "!=": "super_admin" } });
		return exits.success({ userRecord: "", roleList: roleList, roleResult: [] });
	},
};
