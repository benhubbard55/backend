module.exports = {
	friendlyName: "Update",
	description: "Update faqs.",
	inputs: {
		policyId: {
			type: "number",
			required: false,
		},
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

	fn: async function (inputs) {
		let objPolicy = {
			description: inputs.description,
		};

		await Policy.update({ id: inputs.policyId }).set(objPolicy);
		this.req.session.flash = {
			type: "success",
			message: "Policy update successfully",
		};

		throw {
			redirect: "/admin/policy",
		};
	},
};
