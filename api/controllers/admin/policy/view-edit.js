module.exports = {
	friendlyName: "View edit",
	description: 'Display "Edit" page.',
	exits: {
		success: {
			viewTemplatePath: "admin/policy/edit",
		},
		redirect: {
			responseType: "redirect",
		},
	},

	fn: async function (input, exits) {
		var policy_id = this.req.params["policyId"];
		var policyRecord = await Policy.findOne({ id: policy_id })
		return exits.success({
			policyRecord: policyRecord,
		});
	},
};
