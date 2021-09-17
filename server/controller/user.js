import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/user.js";

dotenv.config();
const SECRET_TOKEN = process.env.SECRET_TOKEN;

export const signin = async (req, res) => {
	console.log("sign in: ", SECRET_TOKEN);

	const { email, password } = req.body;
	console.log("email:", email, "password:", password);

	try {
		const existingUser = await User.findOne({ email });
		console.log(existingUser);
		if (!existingUser) {
			console.log("user not true");
			return res.status(404).json({ message: "User doesn't exist." });
		}

		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password
		);
		if (!isPasswordCorrect)
			return req.status(400).json({ message: "Invalid credentials." });

		const token = jwt.sign(
			{ email: existingUser.email, id: existingUser._id },
			SECRET_TOKEN,
			{ expiresIn: "1h" }
		);

		console.log("token: ", token);

		res.status(200).json({ result: existingUser, token });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong." });
	}
};

export const signup = async (req, res) => {
	console.log("sign up ", SECRET_TOKEN);

	const { email, password, confirmPassword, firstName, lastName } = req.body;

	try {
		console.log("sign up try");
		const existingUser = await User.findOne({ email });

		if (existingUser)
			return res.status(400).json({ message: "User already exists." });

		if (password != confirmPassword)
			return res.status(400).json({ message: "Passwords don't match." });

		const hashedPassword = await bcrypt.hash(password, 12);

		const result = await User.create({
			email,
			password: hashedPassword,
			name: `${firstName} ${lastName}`,
		});

		const token = jwt.sign(
			{ email: result.email, id: result._id },
			SECRET_TOKEN,
			{ expiresIn: "1h" }
		);
		console.log("token: ", token);
		res.status(200).json({ result: result, token });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong." });
	}
};
