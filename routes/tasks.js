const express = require("express");
const taskRouter = express.Router();

const authenticate = require("../middleware/authentication");
const {
	createTask,
	getTasks,
	updateTask,
	deleteTask,
} = require("../controller/taskController");

// Middleware to authenticate the user
taskRouter.use(authenticate);
// Route to create a new task
taskRouter.post("/", createTask);
// Route to get all tasks
taskRouter.get("/", getTasks);
// Route to update a task by ID
taskRouter.put("/:id", updateTask);
// Route to delete a task by ID
taskRouter.delete("/:id", deleteTask);
// Export the task router
module.exports = taskRouter;
