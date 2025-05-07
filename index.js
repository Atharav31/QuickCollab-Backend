const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const connectDB = require("./config/db");
const apiRouter = require("./routes/router");
const cookieParser = require("cookie-parser");
require("dotenv").config();
connectDB();

const PORT = process.env.PORT || 8000;

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// CORS
app.use(
	cors({
		origin: "http://localhost:5173",
		methods: ["GET", "POST"],
	})
);

// Routes
app.use("/api", apiRouter);

// Server
app.listen(PORT, () => {
	console.log(`server Running at ${PORT}`);
});
