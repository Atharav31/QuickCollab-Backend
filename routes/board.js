const express = require("express");
const boardRouter = express.Router();
const {
	createBoard,
	getBoards,
	updateBoard,
	deleteBoard,
} = require("../controller/boardController");
const authenticate = require("../middleware/authentication");
// Middleware to authenticate the user
boardRouter.use(authenticate);
// Route to create a new board
boardRouter.post("/", createBoard);
// Route to get all boards
boardRouter.get("/", getBoards);
// Route to update a board by ID
boardRouter.put("/:id", updateBoard);
// Route to delete a board by ID
boardRouter.delete("/:id", deleteBoard);
// Export the board router
module.exports = boardRouter;
