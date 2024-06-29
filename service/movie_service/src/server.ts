import express, { Application } from "express";
import morgan from "morgan";
import "dotenv/config";

import Router from "./routes/index";
import connect from "./config/connectDatabase";

import ErrorHandler from "./middleware/ErrorHandler";

import cors from "cors";

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

console.log("MONGO_URI", MONGO_URI);
console.log("PORT", PORT);

connect({ db: MONGO_URI });

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use(cors());
app.options("*", cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(Router);

app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
