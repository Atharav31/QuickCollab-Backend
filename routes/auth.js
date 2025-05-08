const express = require("express");
const authRouter = express.Router();
const {
	login,
	signUp,
	logout,
	getUser,
	fetchAllUsers,
} = require("../controller/loginController");
const authenticate = require("../middleware/authentication");

authRouter.post("/login", login);
authRouter.get("/getUser", authenticate, getUser);
authRouter.post("/register", signUp);
authRouter.get("/fetchAllUsers", authenticate, fetchAllUsers);
authRouter.post("/logout", logout);

module.exports = authRouter;
