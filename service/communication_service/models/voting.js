const mongoose = require("mongoose");

const VotingSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    require: true,
  },
  movie_id: {
    type: Number,
    require: true,
  },
  vote: {
    type: Number,
    require: true,
  },
});

VotingSchema.index({ user_id: 1, movie_id: 1 });

module.exports = mongoose.model("Voting", VotingSchema);
