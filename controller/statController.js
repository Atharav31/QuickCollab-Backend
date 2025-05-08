import Board from "../models/board.js";

export const getStat = async (req, res) => {
	try {
		const stats = {
			totalTasks: 0,
			completedTasks: 0,
			inProgressTasks: 0,
			notStartedTasks: 0,
		};

		const board = await Board.findOne({ userId: req.user.id });
		if (!board) {
			return res.status().json({ stats, message: "Board not found" });
		}

		const tasks = board.tasks;
		stats.totalTasks = tasks.length;
		stats.completedTasks = tasks.filter(
			(task) => task.status === "done"
		).length;
		stats.inProgressTasks = tasks.filter(
			(task) => task.status === "in-progress"
		).length;
		stats.notStartedTasks = tasks.filter(
			(task) => task.status === "todo"
		).length;

		res
			.status(200)
			.json({ stats, message: "Board stats fetched successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error fetching board stats", error });
	}
};
