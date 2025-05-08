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

const allowedOrigins = [
	"http://localhost:5173",
	"https://quick-collab-frontend.vercel.app",
	// "*",
];

app.use(
	cors({
		origin: allowedOrigins,
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
		credentials: true,
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

// Routes
app.use("/api", apiRouter);

// Server
app.listen(PORT, () => {
	console.log(`server Running at ${PORT}`);
});
