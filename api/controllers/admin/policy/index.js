module.exports = {
	friendlyName: 'View faq',
	description: 'Display faqs.',
	inputs: {

	},

	fn: async function (inputs, exits) {
		let result = await sails.helpers.datatable.with({
			model: Policy,
			options: this.req.query
		});
		return exits.success(result);
	}
};