import Board from "../models/board.js";

export const getBoards = async (req, res) => {
	try {
		const boards = await Board.find({
			$or: [
				{ userId: req.user._id }, // user is the owner
				{ collaborators: req.user._id }, // user is a collaborator
			],
		});
		res.status(200).json({ boards });
	} catch (error) {
		res.status(500).json({ message: "Error fetching boards", error });
	}
};

export const createBoard = async (req, res) => {
	try {
		const { title, description, tasks } = req.body;
		const newBoard = new Board({
			title,
			description,
			tasks: tasks || [],
			userId: req.user.id,
		});
		await newBoard.save();
		res.status(201).json({ board: newBoard });
	} catch (error) {
		res.status(500).json({ message: "Error creating board", error });
	}
};
export const updateBoard = async (req, res) => {
	try {
		const { id } = req.params;
		const { action, payload } = req.body;

		let updatedBoard;

		switch (action) {
			case "updateBoardInfo":
				updatedBoard = await Board.findByIdAndUpdate(
					id,
					{
						...(payload.title && { title: payload.title }),
						...(payload.description && { description: payload.description }),
					},
					{ new: true }
				);
				break;

			case "addCollaborator":
				updatedBoard = await Board.findByIdAndUpdate(
					id,
					{ $addToSet: { collaborators: payload.userId } },
					{ new: true }
				);
				break;
			case "removeCollaborator":
				updatedBoard = await Board.findByIdAndUpdate(
					id,
					{ $pull: { collaborators: payload.userId } },
					{ new: true }
				);
				break;
			case "addTask":
				updatedBoard = await Board.findByIdAndUpdate(
					id,
					{ $push: { tasks: payload.task } },
					{ new: true }
				);
				break;

			case "updateTask":
				updatedBoard = await Board.findOneAndUpdate(
					{ _id: id, "tasks._id": payload.taskId },
					{
						$set: {
							"tasks.$.title": payload.task.title,
							"tasks.$.description": payload.task.description,
							"tasks.$.status": payload.task.status,
							"tasks.$.priority": payload.task.priority,
							"tasks.$.dueDate": payload.task.dueDate,
						},
					},
					{ new: true }
				);
				break;

			case "deleteTask":
				updatedBoard = await Board.findByIdAndUpdate(
					id,
					{ $pull: { tasks: { _id: payload.taskId } } },
					{ new: true }
				);
				break;

			default:
				return res.status(400).json({ message: "Invalid action type" });
		}

		if (!updatedBoard) {
			return res.status(404).json({ message: "Board not found" });
		}

		res.status(200).json({ board: updatedBoard });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error updating board", error });
	}
};

export const deleteBoard = async (req, res) => {
	try {
		const { id } = req.params;
		const deletedBoard = await Board.findByIdAndDelete(id);
		if (!deletedBoard) {
			return res.status(404).json({ message: "Board not found" });
		}
		res.status(200).json({ message: "Board deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Error deleting board", error });
	}
};
