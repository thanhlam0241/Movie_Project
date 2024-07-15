const mongoose = require("mongoose");

const MovieRatingSchema = new mongoose.Schema({
  movie_id: {
    type: Number,
    require: true,
  },
  rating: {
    type: Number,
    require: true,
  },
  numberOfRating: {
    type: Number,
    require: true,
  },
});

MovieRatingSchema.index({ movie_id: 1 });

module.exports = mongoose.model("MovieRating", MovieRatingSchema);
