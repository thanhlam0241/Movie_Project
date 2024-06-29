require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");

const { errorHandler } = require("./middleware/errorHandler");
const { connect } = require("./utils/config/db");

const PORT = process.env.PORT || 3500;

// const resIdentify = require('./utils/proto/clientNode')

// const clientRedis = require('./utils/database/connection_redis');
// require('./utils/connection_mongodb');

connect();

const app = express();

app.use(helmet());
app.use(morgan("common"));
app.use(cors());
app.options("*", cors());

app.get("/helloworld", (req, res) => {
  res.send("Hello World");
});

app.get("/chatpage", (req, res) => {
  res.sendFile(__dirname + "/views" + "/index.html");
});

//custom middleware logger
//app.use(logger);

//middlerware cors option
// app.use(cors(corsOptions));

//built-in middleware to handler urlencoded data
// in other word, form data:
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// built-in middleware for json
app.use(express.json());

//built-in middleware to serve static file
app.use("/static", express.static("static"));

app.use(
  "/avatar",
  (req, res, next) => {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  },
  express.static("uploads/avatar")
);
app.use(
  "/background",
  (req, res, next) => {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  },
  express.static("uploads/background")
);

app.use("/node_modules", express.static("node_modules"));

// middleware to authenticate token
app.use("/comment", require("./routes/api/comment"));
app.use("/rating", require("./routes/api/rating"));

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

const createServerSocket = require("./utils/socket/socketServer");

const { server, io } = createServerSocket(app);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
