module.exports = {
	friendlyName: "Update",
	description: "Update faqs.",
	inputs: {
		termId: {
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
		let objTerm = {
			description: inputs.description,
		};

		await Terms.update({ id: inputs.termId }).set(objTerm);
		this.req.session.flash = {
			type: "success",
			message: "Terms & Condition update successfully",
		};

		throw {
			redirect: "/admin/terms",
		};
	},
};
