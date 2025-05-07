const express = require("express");
const apiRouter = express.Router();
const authRouter = require("./auth");
const boardRouter = require("./board");

apiRouter.use("/auth", authRouter);
apiRouter.use("/boards", boardRouter);
module.exports = apiRouter;
