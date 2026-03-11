module.exports = {
	friendlyName: "View edit",
	description: 'Display "Edit" page.',
	exits: {
		success: {
			viewTemplatePath: "admin/termsCondition/edit",
		},
		redirect: {
			responseType: "redirect",
		},
	},

	fn: async function (input, exits) {
		var term_id = this.req.params["termId"];
		var termRecord = await Terms.findOne({ id: term_id })
		return exits.success({
			termRecord: termRecord,
		});
	},
};
