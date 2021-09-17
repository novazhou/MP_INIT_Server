import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";

const auth = async (req, res, next) => {
	dotenv.config();
	const SECRET_TOKEN = process.env.SECRET_TOKEN;

	try {
		const token = req.headers.authorization.split(" ")[1];
		const isCustomAuth = token.length < 500; //to differ with the google authenticaion

		let decodedData;

		if (token && isCustomAuth) {
			decodedData = jwt.verify(token, SECRET_TOKEN);

			req.userId = decodedData?.id;
		} else {
			decodedData = jwt.decode(token);
			req.userId = decodedData?.sub;
		}

		next();
	} catch (error) {
		console.log(error);
	}
};

export default auth;
