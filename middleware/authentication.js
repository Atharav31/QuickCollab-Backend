const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
	console.log("Authentication middleware", req.cookies);
	const authHeader = req.cookies.token;
	if (!authHeader) {
		return res.status(401).json({ message: "Unauthorized" });
	}
	try {
		const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
		req.user = decoded;
		console.log("Decoded token", decoded);
		next();
	} catch (error) {
		return res.status(401).json({ message: "Unauthorized" });
	}
};

module.exports = authenticate;
