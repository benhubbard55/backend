module.exports = {
	friendlyName: "Delete",
	description: "Delete faqs.",
	inputs: {
		id: {
			type: "number",
			required: false,
		},
	},
	exits: {
		invalid: {
			statusCode: 500,
			description: "Something went wrong",
		},
		badRequest: {
			statusCode: 400,
			description: "Faq Id is required.",
		},
		notFound: {
			statusCode: 404,
			description: "Faq not found",
		},
		success: {},
	},

	fn: async function (inputs, exits) {
		try {
			if (!inputs.id) {
				return exits.badRequest({
					message: "parameterMissing",
				});
			}

			const faq = await Faq.findOne({ id: inputs.id });
			if (!faq) {
				return exits.notFound({
					message: "faq Not Found",
				});
			}

			await Faq.destroy({ id: inputs.id });
			return exits.success({
				message: "Faq delete successfully",
			});
		} catch (err) {
			return exits.invalid({
				message: "something Wrong",
			});
		}
	},
};
