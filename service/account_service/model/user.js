const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
});

// userSchema.index({ username: "text" });

module.exports = mongoose.model("User", userSchema);
