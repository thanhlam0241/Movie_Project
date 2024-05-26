const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  movie_id: {
    type: Number,
    require: true,
  },
  user_id: {
    type: Number,
    require: true,
  },
  text: {
    type: String,
    require: true,
  },
  create_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

CommentSchema.index({ movie_id: 1, user_id: 1 });

module.exports = mongoose.model("Comment", CommentSchema);
