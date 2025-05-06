const express = require("express");
require("dotenv").config();
const app = express();
const connectDB = require("./config/db");
const morgan = require("morgan");
const router = require("./routes/router");
connectDB();

// Middleware
app.use(express.json());
app.use(morgan("tiny"));
const port = process.env.PORT || 5000;
app.use("/api", router);

app.listen(port, () => console.log(`Server started on ${port}`));
