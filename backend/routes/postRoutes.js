import express from "express";
import { Post } from "../models/Post.js";
import { authMiddleware } from "../utils/auth.js";

const router = express.Router();

router.use(authMiddleware);

// POST
router.post("/", async (req, res) => {
	try {
		// our post needs to know what user it's related to
		const post = await Post.create({ ...req.body, author: req.user._id });

		// turn the author field from an id into a user document (that includes the username)
		await post.populate("author", "username");

		res.status(200).json(post);
	} catch (error) {
		console.log(error.message);
		res.status(400).json({ message: error.message });
	}
});

// GET all posts
router.get("/", async (req, res) => {
	try {
		// get all posts, but you can filter posts based on logged in user: { author: req.user._id }
		const posts = await Post.find({})
			.sort({ createdAt: -1 }) // new to old
			// turn the author (which is an id) into the user docuent for that author/id
			// the second argument 'username' is the field in the user document we want to keep
			.populate("author", "username");
		res.status(200).json(posts);
	} catch (error) {
		console.log(error.message);
		res.status(400).json({ message: error.message });
	}
});

export default router;
