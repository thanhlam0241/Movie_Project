const ratingSchema = require("../models/rating");

const ratingMovie = async (req, res) => {
  try {
    const movieId = parseInt(req.params.movie_id);
    const { user_id, score } = req.body;
    const rating = new ratingSchema({
      user_id,
      movie_id: movieId,
      rating: score,
    });
    await rating.save();
    res.status(200).send("Rating saved");
  } catch (error) {
    res.status(500).send(error);
  }
};

const getRatingMovie = async (req, res) => {
  try {
    const movieId = parseInt(req.params.movie_id);
    const user_id = parseInt(req.query.userId);
    const totalRate = await ratingSchema.countDocuments({ movie_id: movieId });
    const userRate = await ratingSchema
      .findOne({ movie_id: movieId, user_id })
      .select("rating");
    const avarageRate = await ratingSchema.aggregate([
      { $match: { movie_id: movieId } },
      { $group: { _id: "$movie_id", avgRate: { $avg: "$rating" } } },
    ]);
    const ratings = {
      total: totalRate,
      rating: userRate ? userRate.rating : 0,
      description: avarageRate
        ? Math.round(avarageRate[0].avgRate * 10) / 10
        : 0,
    };
    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).send(error);
  }
};

const changeRatingMovie = async (req, res) => {
  try {
    const movie_id = parseInt(req.params.movie_id);
    const { user_id, rating } = req.body;
    let userRate = await ratingSchema.exists({ user_id, movie_id });
    let result;
    if (!userRate) {
      result = await ratingSchema.create({ user_id, movie_id, rating });
    } else {
      result = await ratingSchema.updateOne({ user_id, movie_id }, { rating });
    }
    res.status(200).json({
      message: "Rating updated",
      result,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  ratingMovie,
  getRatingMovie,
  changeRatingMovie,
};
