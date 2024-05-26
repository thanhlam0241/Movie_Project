const express = require("express");
const path = require("path");

const router = express.Router();

/* This code is defining a router object in Express.js that handles HTTP requests for various
endpoints. */
router.get("^/$|server(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

module.exports = router;
