import express, { Application } from "express";
import morgan from "morgan";
import "dotenv/config";

import Router from "./routes/index";
import connect from "./config/connectDatabase";

import ErrorHandler from "./middleware/ErrorHandler";

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

console.log("MONGO_URI", MONGO_URI);
console.log("PORT", PORT);

connect({ db: MONGO_URI });

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use(Router);

app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
