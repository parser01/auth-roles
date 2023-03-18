const { Router } = require("express");
const { check } = require("express-validator");

const authController = require("../controllers/authController");

const authRouter = new Router();

authRouter.post(
	"/sign-up",
	[
		check("username", "Username cannot be empty").notEmpty(),
		check(
			"password",
			"Password should be at least 8 and at most 15 charcaters long"
		).isLength({ min: 8, max: 15 }),
	],
	authController.signUp
);
authRouter.post("/log-in", authController.logIn);
authRouter.get("/users", authController.getUsers);

module.exports = authRouter;
