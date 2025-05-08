const express = require("express");
const apiRouter = express.Router();
const authRouter = require("./auth");
const boardRouter = require("./board");
const statRouter = require("./useStat");

apiRouter.use("/auth", authRouter);
apiRouter.use("/boards", boardRouter);
apiRouter.use("/stats", statRouter);

module.exports = apiRouter;
