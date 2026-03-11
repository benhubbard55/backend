module.exports = {
	friendlyName: "View show",
	description: 'Display "Show" page.',
	exits: {
		success: {
			viewTemplatePath: "admin/termsCondition/show",
		},
	},

	fn: async function (inputs, exits) {
		var termId = this.req.params["id"];
		var termsRecord = await Terms.findOne({
			id: termId,
		});
		return exits.success({
			termsRecord: termsRecord,
		});
	},
};
