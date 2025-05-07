const express = require("express");
const apiRouter = express.Router();
const authRouter = require("./auth");
// const taskRouter = require("./tasks");
const boardRouter = require("./board");

apiRouter.use("/auth", authRouter);
// apiRouter.use("/tasks", taskRouter);
apiRouter.use("/boards", boardRouter);
module.exports = apiRouter;
