const bcrypt = require("bcrypt");
const User = require("../models/users");
const cookieParser = require("cookie-parser");
const { generateToken } = require("../utils/token");

exports.login = async (req, res) => {
	try {
		console.log(req.body);
		const { email, password } = req.body.payload;

		if (!email || !password) {
			return res
				.status(400)
				.json({ message: "Email and password are required" });
		}

		const user = await User.findOne({ email });

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ message: "Invalid email or password" });
		}

		const token = generateToken(user);
		const { password: _, ...userWithoutPassword } = user._doc;
		res.cookie("token", token, { httpOnly: true });
		res.status(200).json({
			user: userWithoutPassword,

			message: "User logged in successfully",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

exports.signUp = async (req, res) => {
	try {
		const { fullName, email, password } = req.body;
		console.log(req.body);

		if (!fullName) {
			return res.status(400).json({ message: "Full name is required" });
		}

		if (!email || !password) {
			return res
				.status(400)
				.json({ message: "Email and password are required" });
		}

		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return res.status(400).json({ message: "Email already exists" });
		}

		// Hash the password before saving
		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await User.create({
			email,
			fullName,
			password: hashedPassword,
		});
		const { password: _, ...userWithoutPassword } = user._doc;

		res.status(201).json({
			data: userWithoutPassword,
			message: "User created successfully",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

exports.logout = async (req, res) => {
	try {
		res.clearCookie("token");
		res.status(200).json({ message: "User logged out successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

exports.getUser = async (req, res) => {
	try {
		console.log(req.user);
		const userId = req.user.id;

		const user = await User.findById(userId).select("-password");
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json({ user });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

exports.fetchAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json({ users });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};
