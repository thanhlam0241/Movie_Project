const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  avatar: {
    type: String,
    required: false,
  },
  createdBy: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Admin", adminSchema);
