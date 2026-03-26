import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		require: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minLength: 5,
	},
	email: {
		type: String,
		require: true,
		unique: true,
	},
});

export const User = mongoose.model("User", userSchema);
