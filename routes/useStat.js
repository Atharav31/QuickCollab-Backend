const express = require("express");
const statRouter = express.Router();
const authenticate = require("../middleware/authentication.js");
const { getStat } = require("../controller/statController.js");
// Middleware to authenticate the user
statRouter.use(authenticate);
// Route to get all stats
statRouter.get("/", getStat);
// Export the stat router
module.exports = statRouter;
