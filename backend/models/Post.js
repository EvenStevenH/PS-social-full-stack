import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		require: true,
		trim: true,
	},
	body: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

export const Post = mongoose.model("Post", postSchema);
