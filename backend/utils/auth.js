import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

export async function authMiddleware(req, res, next) {
	try {
		let token = req.headers.authorization;
		// check if there's a token
		if (!token) {
			return res.status(401).json({ message: "No token provided!" });
		}
        
		token = token.split(" ").pop().trim(); // remove the "Bearer" part of token

		// verify token
		const { data } = jwt.verify(token, jwtSecret);
		req.user = data; // pass payload from the token to the req object

		next(); // move onto the router (or next middleware)
	} catch (error) {
		console.log(error.message);
		exports.status(400).json({ message: error.message });
	}
}
