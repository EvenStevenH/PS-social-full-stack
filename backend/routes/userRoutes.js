import express from "express";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../utils/auth.js";

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET;
const jwtExpiration = "24h";

// {
//     "username": "Steven",
//     "email": "email@email.com",
//     "password": "12345"
// }

// http://localhost:3000/api/users/register
router.post("/register", async (req, res) => {
	try {
		// hash the password
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

		const user = await User.create({
			...req.body,
			password: hashedPassword, // replaces req.body.password with hashedPassword
		});

		// create a token
		const payload = {
			username: user.username,
			email: user.email,
			_id: user._id,
		};
		const token = jwt.sign({ data: payload }, jwtSecret, { expiresIn: jwtExpiration });

		res.status(201).json({ token, user });
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
});

// http://localhost:3000/api/users/login
router.post("/login", async (req, res) => {
	try {
		// find the user > check if the user exists
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			return res.status(400).json({ message: "User does not exist!" });
		}

		// check password
		const correctPassword = bcrypt.compare(req.body.password, user.password);
		if (!correctPassword) {
			return res.status(400).json({ message: "Incorrect password!" });
		}

		// create a token
		const payload = {
			username: user.username,
			email: user.email,
			_id: user._id,
		};
		const token = jwt.sign({ data: payload }, jwtSecret, { expiresIn: jwtExpiration });

		res.status(201).json({ message: "Login successful!", token, user });
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
});

router.use(authMiddleware);

router.get("/", (req, res) => {
	res.status(200).json(req.user);
});

export default router;
