import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import { setCookies } from "../utils/setcookies.js";

export const register = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		let user = await User.findOne({ email });

		if (user)
			res.status(400).json({
				success: false,
				message: "Previously registered user",
			});
		else {
			const hashedPassword = await bcrypt.hash(password, 10);

			user = await User.create({ name, email, password: hashedPassword });

			setCookies(res, user.id, name, 201, 1000 * 60 * 60);
		}
	} catch (error) {
		res.status(400).json({ error: error.message, success: false });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		// here due to select keyword in password we have to manually extract the password using +password and by default it will be not be there.
		let user = await User.findOne({ email }).select("+password");

		if (user) {
			const matched = await bcrypt.compare(password, user.password);
			if (matched) {
				setCookies(res, user.id, user.name, 200, 1000 * 60 * 60);
			} else {
				res.status(401).json({
					success: false,
					message: "Wrong Password",
				});
			}
		} else {
			res.status(401).json({ success: false, message: "User Not Found" });
		}
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

export const logout = (req, res) => {
	const { token } = req.cookies;

	if (!token) {
		res.status(400).json({ success: false, message: "Already logged out" });
	} else setCookies(res, "", "Logout Successfully", 200, 0);
};

export const getMyProfile = (req, res) => {
	res.status(200).json({ success: true, user: req.user.name });
};
