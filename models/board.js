const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: ["todo", "in-progress", "done"],
			default: "todo",
		},
		priority: {
			type: String,
			enum: ["low", "medium", "high"],
			default: "medium",
		},

		dueDate: Date,
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Comment",
			},
		],
	},
	{ timestamps: true }
);

const BoardSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		tasks: [TaskSchema], // Embedded array of tasks
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		collaborators: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{ timestamps: true }
);

const Board = mongoose.model("Board", BoardSchema);
module.exports = Board;
