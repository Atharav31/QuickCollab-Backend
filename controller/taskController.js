export const getTasks = async (req, res) => {
	try {
		// Assuming you have a Task model to interact with your database
		const tasks = await Tas.find({ user: req.user._id });
		res.status(200).json({ tasks });
	} catch (error) {
		res.status(500).json({ message: "Error fetching tasks", error });
	}
};

export const createTask = async (req, res) => {
	try {
		const { title, description } = req.body;
		const newTask = new Task({
			title,
			description,
			user: req.user._id,
		});
		await newTask.save();
		res.status(201).json({ task: newTask });
	} catch (error) {
		res.status(500).json({ message: "Error creating task", error });
	}
};

export const updateTask = async (req, res) => {
	try {
		const { id } = req.params;
		const { title, description, completed } = req.body;
		const updatedTask = await Task.findByIdAndUpdate(
			id,
			{ title, description, completed },
			{ new: true }
		);
		if (!updatedTask) {
			return res.status(404).json({ message: "Task not found" });
		}
		res.status(200).json({ task: updatedTask });
	} catch (error) {
		res.status(500).json({ message: "Error updating task", error });
	}
};
export const deleteTask = async (req, res) => {
	try {
		const { id } = req.params;
		const deletedTask = await Task.findByIdAndDelete(id);
		if (!deletedTask) {
			return res.status(404).json({ message: "Task not found" });
		}
		res.status(200).json({ message: "Task deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Error deleting task", error });
	}
};
