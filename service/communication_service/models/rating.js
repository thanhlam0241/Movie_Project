const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    require: true,
  },
  movie_id: {
    type: Number,
    require: true,
  },
  rating: {
    type: Number,
    require: true,
  },
  create_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

RatingSchema.index({ user_id: 1, movie_id: 1 });

module.exports = mongoose.model("Rating", RatingSchema);
