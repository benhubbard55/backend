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
		var termRecord = await Terms.create({
			description: inputs.description,
		}).fetch();

		if (!termRecord) {
			return exits.invalid({
				message: "invalid",
			});
		}
	
		this.req.session.flash = {
			type: "success",
			message: "Terms & Condition created successfully",
		};

		throw {
			redirect: "/admin/terms",
		};
	},
};
