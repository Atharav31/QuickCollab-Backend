import Board from "../models/board.js";

export const getBoards = async (req, res) => {
	try {
		const boards = await Board.find({ user: req.user._id });
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
		const { title } = req.body;
		const updatedBoard = await Board.findByIdAndUpdate(
			id,
			{ title },
			{ new: true }
		);
		if (!updatedBoard) {
			return res.status(404).json({ message: "Board not found" });
		}
		res.status(200).json({ board: updatedBoard });
	} catch (error) {
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
