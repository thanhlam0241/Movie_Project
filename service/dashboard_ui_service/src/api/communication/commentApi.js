import base from "./base";

class CommentAPI {
  async getComment(movieId, page) {
    const data = await base.get(`/comment/${movieId}?page=${page}`);
    return data;
  }
  async commentMovie(userId, movieId, text) {
    const data = await base.post(`/comment/${movieId}`, {
      userId: userId,
      text: text,
    });
    return data;
  }
}

export default new CommentAPI();
