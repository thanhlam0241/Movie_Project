const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  sender: {
    type: String,
    require: true,
  },
  text: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
    default: "success",
  },
  create_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
  type_to: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: false,
  },
});

module.exports = mongoose.model("Notification", NotificationSchema);
