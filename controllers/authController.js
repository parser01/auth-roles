const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const Role = require("../models/Role");
const User = require("../models/User");

class AuthController {
	async signUp(req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res
					.status(400)
					.json({ message: "Registration error", errors });
			}
			const { username, password } = req.body;
			const candidate = await User.findOne({ username });
			if (candidate) {
				return res
					.status(409)
					.json({ message: "This username is already taken" });
			}
			const hashedPassword = bcrypt.hashSync(password, 7);
			const userRole = await Role.findOne({ value: "USER" });
			// const user = await User.create({username, password: hashedPassword, roles: [userRole.value]})
			const user = new User({
				username,
				password: hashedPassword,
				roles: [userRole.value],
			});
			await user.save();
			return res.json({ message: "Account has been successfully created" });
		} catch (error) {
			console.log(error);
			return res.status(500).json(error);
		}
	}

	async logIn(req, res) {
		try {
			const { username, password } = req.body;
			const user = await User.findOne({ username });
			if (!user) {
				return res.status(400).json(`User ${user} not found`);
			}
			const validPassword = bcrypt.compareSync(password, user.password);
			if (!validPassword) {
				return res
					.status(400)
					.json({ message: "The specified password is incorrect" });
			}
			return res.json({ message: "Authorization succeed" });
		} catch (error) {
			console.log(error);
			return res.status(500).json(error);
		}
	}

	async getUsers(req, res) {
		try {
			// await Role.create([{}, { value: "ADMIN" }]);
			/* 			const userRole = new Role();
			const adminRole = new Role({ value: "ADMIN" });
			await userRole.save();
			await adminRole.save(); */
			return res.json("server is ready");
		} catch (error) {
			console.log(error);
			return res.status(500).json(error);
		}
	}
}

module.exports = new AuthController();
