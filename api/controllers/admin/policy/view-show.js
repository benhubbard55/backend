module.exports = {
	friendlyName: "View show",
	description: 'Display "Show" page.',
	exits: {
		success: {
			viewTemplatePath: "admin/policy/show",
		},
	},

	fn: async function (inputs, exits) {
		var policyId = this.req.params["id"];
		var policyRecord = await Policy.findOne({
			id: policyId,
		});
		return exits.success({
			policyRecord: policyRecord,
		});
	},
};
