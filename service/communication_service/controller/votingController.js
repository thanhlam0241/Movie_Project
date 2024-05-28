const votingSchema = require("../models/voting");

const votingMovie = async (req, res) => {
  try {
    const movieId = parseInt(req.params.movie_id);
    const { user_id, vote } = req.body;
    const voting = new votingSchema({ user_id, movie_id: movieId, vote });
    await voting.save();
    res.status(200).send("Voting saved");
  } catch (error) {
    res.status(500).send(error);
  }
};

const getVotingMovie = async (req, res) => {
  try {
    const movieId = parseInt(req.params.movie_id);
    const user_id = parseInt(req.query.userId);
    const totalVote = await votingSchema.countDocuments({ movie_id: movieId });
    const userVote = await votingSchema
      .findOne({ movie_id: movieId, user_id })
      .select("vote");
    const avarageVote = await votingSchema.aggregate([
      { $match: { movie_id: movieId } },
      { $group: { _id: "$movie_id", avgVote: { $avg: "$vote" } } },
    ]);
    const votings = {
      total: totalVote,
      voting: userVote ? userVote.vote : 0,
      description: avarageVote
        ? Math.round(avarageVote[0].avgVote * 10) / 10
        : 0,
    };
    res.status(200).json(votings);
  } catch (error) {
    res.status(500).send(error);
  }
};

const changeVotingMovie = async (req, res) => {
  try {
    const movie_id = parseInt(req.params.movie_id);
    const { user_id, vote } = req.body;
    let userVote = await votingSchema.exists({ user_id, movie_id });
    console.log(userVote);
    let result;
    if (!userVote) {
      result = await votingSchema.create({ user_id, movie_id, vote });
    } else {
      result = await votingSchema.updateOne({ user_id, movie_id }, { vote });
    }
    res.status(200).json({
      message: "Voting updated",
      result,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  votingMovie,
  getVotingMovie,
  changeVotingMovie,
};
