
module.exports = async function (req, res, proceed) {
	if (!req.session.adminId) {
		return res.unauthorized();
	}
	return proceed();
};
