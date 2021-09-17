import mongoose from "mongoose";

const postSchema = mongoose.Schema({
	title: String,
	message: String,
	name: String,
	creator: String,
	tags: [String],
	selectedFile: String,
	// likeCount: {
	// 	type: Number,
	// 	default: 0,
	// },
	likes: {
		type: [String],
		default: [],
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
