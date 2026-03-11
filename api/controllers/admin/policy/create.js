module.exports = {
	friendlyName: "Create",
	description: "Create faqs.",
	inputs: {
		description: {
			type: "string",
			required: false,
		}
	},
	exits: {
		redirect: {
			responseType: "redirect",
		},
	},

	fn: async function (inputs, exits) {
		var policyRecord = await Policy.create({
			description: inputs.description,
		}).fetch();

		if (!policyRecord) {
			return exits.invalid({
				message: "invalid",
			});
		}
	
		this.req.session.flash = {
			type: "success",
			message: "Policy created successfully",
		};

		throw {
			redirect: "/admin/policy",
		};
	},
};
