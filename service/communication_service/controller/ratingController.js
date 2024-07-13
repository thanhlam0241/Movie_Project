const ratingSchema = require("../models/rating");
const { sendMessage } = require("../config/kafka.js");

const ratingMovie = async (req, res) => {
  let message = null;
  try {
    const movieId = parseInt(req.params.movie_id);
    const { user_id, rate } = req.body;
    let ratingExist = await ratingSchema.findOne({
      user_id: user_id,
      movie_id: movieId,
    });
    if (rate > 6) {
      message = {
        user_id: user_id,
        movie_id: movieId,
        behavior: "RATE",
      };
    }
    if (!ratingExist) {
      ratingExist = new ratingSchema({
        user_id,
        movie_id: movieId,
        rating: rate,
      });
    } else {
      ratingExist.rating = rate;
      ratingExist.create_at = new Date();
    }
    await ratingExist.save();
    res.status(200).send("Rating saved");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  } finally {
    if (message) sendMessage("movie-behaviors", message);
  }
};

const getRatingMovie = async (req, res) => {
  try {
    const movieId = parseInt(req.params.movie_id);
    const user_id = parseInt(req.query.userId);

    const userRate = await ratingSchema
      .findOne({ movie_id: movieId, user_id })
      .select("rating");
    // const avarageRate = await ratingSchema.aggregate([
    //   { $match: { movie_id: movieId } },
    //   { $group: { _id: "$movie_id", avgRate: { $sum: "$rating" } } },
    // ]);
    // if (!Array.isArray(avarageRate) || avarageRate.length == 0) {
    //   return res.json({
    //     total: 0,
    //     rating: 0,
    //     description: 0,
    //   });
    // }
    const ratings = {
      rating: userRate ? userRate.rating : 0,
    };
    res.status(200).json(ratings);
  } catch (error) {
    console.log(error);
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
