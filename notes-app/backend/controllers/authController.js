const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const createToken = (userId) =>
	jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

const register = async (req, res, next) => {
	try {
		const name = req.body.name?.trim();
		const email = req.body.email?.trim().toLowerCase();
		const password = req.body.password;

		if (!name || !email || typeof password !== "string") {
			return res.status(400).json({ message: "Name, email, and password are required" });
		}
		if (password.length < 8) {
			return res.status(400).json({ message: "Password must be at least 8 characters" });
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(409).json({ message: "An account with this email already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 12);
		const user = await User.create({ name, email, password: hashedPassword });

		return res.status(201).json({
			message: "Registration successful",
			user: { id: user._id, name: user.name, email: user.email },
		});
	} catch (error) {
		return next(error);
	}
};

const login = async (req, res, next) => {
	try {
		const email = req.body.email?.trim().toLowerCase();
		const password = req.body.password;

		if (!email || typeof password !== "string") {
			return res.status(400).json({ message: "Email and password are required" });
		}

		const user = await User.findOne({ email });
		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(401).json({ message: "Invalid email or password" });
		}

		return res.json({
			token: createToken(user._id.toString()),
			user: { id: user._id, name: user.name, email: user.email },
		});
	} catch (error) {
		return next(error);
	}
};

module.exports = { register, login };
