module.exports = async function (req, res, next) {
    var token = null;
    var tokenClone = null;

    if (req.headers && req.headers.authorization) {
        var parts = req.headers.authorization.split(" ");
        if (parts.length === 2) {
            var scheme = parts[0];
            var credentials = parts[1];

            if (/^Bearer$/i.test(scheme)) {
                token = credentials;
                tokenClone = token;
            }
        } else {
            return res.status(401).json({
                status: false,
                message: "Format is Authorization: Bearer [token]",
            });
        }
    } else if (req.param("token")) {
        token = req.param("token");
        tokenClone = token;
        // We delete the token from param to not mess with blueprints
        delete req.query.token;
    } else if (
        req.socket &&
        req.socket.handshake &&
        req.socket.handshake.query &&
        req.socket.handshake.query.token
    ) {
        token = req.socket.handshake.query.token;
        tokenClone = token;
    } else {
        return res.status(401).json({
            status: false,
            message: "No Authorization header was found",
        });
    }

    jwToken.verify(token, async (err, token) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.expired();
            } else {
                return res.unauthorized();
            }
        } else {
            req.token = token; // This is the decrypted token or the payload you provided

            if (!token || !token.id) {
                return res.status(401).json({
                    status: false,
                    message: "Token Missmatch",
                });
            }

            var userObj = await User.findOne({ id: token.id, userType: 2 });
            if (!userObj) {
                return res.status(401).json({
                    status: false,
                    message: "Token Missmatch",
                });
            }

            if (!userObj?.isVerified) {
                return res.status(401).json({
                    status: false,
                    message: "Artist not verified",
                });
            }

            if (!userObj?.isActive) {
                return res.status(401).json({
                    status: false,
                    message: "Artist blocked",
                });
            }

            if (userObj?.isDeleted) {
                return res.status(401).json({
                    status: false,
                    message: "Artist deleted",
                });
            }

            req.loggedInUser = userObj;
            return next();
        }
    });
};
