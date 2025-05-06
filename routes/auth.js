const express = require("express");
const authRouter = express.Router();
const { login, signUp } = require("../controller/loginController");

authRouter.post("/login", login);
authRouter.post("/register", signUp);

module.exports = authRouter;
