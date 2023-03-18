const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routers/authRouter");

const PORT = process.env.PORT ?? 5000;
const DB_URL =
	"mongodb+srv://auth-roles-user:user123@cluster0.hv5fmzg.mongodb.net/?retryWrites=true&w=majority";

const app = express();

app.use(express.json());
app.use("/auth", authRouter);

async function startApp() {
	try {
		await mongoose.connect(DB_URL);
		app.listen(PORT, () => console.log(`server started on port ${PORT}`));
	} catch (error) {
		console.log(error);
	}
}

startApp();

console.log("haha");
