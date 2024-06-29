import base from "./base";

class RatingAPI {
  async getRating(userId, movieId) {
    const data = await base.get(`/rating/${movieId}?userId=${userId}`);
    return data;
  }
  async rateMovie(userId, movieId, rating) {
    const data = await base.post(`/rating/${movieId}`, {
      user_id: userId,
      rate: rating,
    });
    return data;
  }
}

export default new RatingAPI();
