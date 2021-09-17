import express from "express";
import bodyParser from "body-parser";
import Mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
//app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
//app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/user", userRoutes);

// https://www.mongodb.com/cloud/atlas

// use .env to hide the URL and Password
// const CONNECTION_URL =
// 	"mongodb+srv://memoriesproject:memoriesproject2021@cluster0.bvcii.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

Mongoose.connect(process.env.CONNECTION_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() =>
		app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
	)
	.catch((error) => console.log(error.message));

Mongoose.set("useFindAndModify", false);
