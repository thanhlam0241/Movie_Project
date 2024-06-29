require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const { errorHandler } = require("./middleware/errorHandler");

const PORT = process.env.PORT || 3500;
const MONGO_URI = process.env.MONGO_URI;

//------------ Mongo Connection ------------//
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.log(err));

const app = express();

app.use(helmet());
app.use(morgan("common"));
app.use(cors());
app.options("*", cors());

//built-in middleware to handler urlencoded data
// in other word, form data:
//'content-type': application/x-www-form-urlencoded
// app.use(express.urlencoded({
//     extended: false
// }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// built-in middleware for json
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("", (req, res) => {
  res.send("Hello World");
});

app.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.use("/user", require("./routes/user.route.js"));
app.use("/admin", require("./routes/admin.route.js"));

// Route handlers
app.all("/*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({
      error: "404 NOT FOUND",
    });
  } else {
    res.type("txt").send("404 NOT FOUND");
  }
});

// middleware handles error
app.use(errorHandler);

app.listen(PORT, console.log(`Server running on PORT ${PORT}`));
