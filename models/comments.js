const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
	{
		message: {
			type: String,
			required: true,
		},
		taskId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Task",
			required: true,
		},
		fromUserId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		toUserId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);
const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
