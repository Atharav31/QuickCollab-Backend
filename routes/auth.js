const express = require("express");
const authRouter = express.Router();
const { login, signUp, logout } = require("../controller/loginController");

authRouter.post("/login", login);
authRouter.post("/register", signUp);
authRouter.get("/logout", logout);

module.exports = authRouter;
