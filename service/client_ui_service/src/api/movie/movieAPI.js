import BaseAPI from "./baseAPI";

class MovieAPI extends BaseAPI {
  constructor() {
    super("movies");
  }
  async filter(genres, page = 1, sortBy = "id", order = "desc") {
    const result = await this.base.post(
      `/${this.controllerName}/filter?page=${page}&sort_by=${sortBy}&sort_order=${order}`,
      {
        genres: Array.isArray(genres) ? genres : [],
      }
    );
    return result.data;
  }
  async search(str) {
    const result = await this.base.post(`/${this.controllerName}/search`, {
      page: 1,
      size: 20,
      search: str ?? "",
    });
    return result.data;
  }
  async searchText(str, page, size) {
    const result = await this.base.post(`/${this.controllerName}/searchText`, {
      page: page,
      size: size,
      search: str ?? "",
    });
    return result.data;
  }
  async getRecommendation(userId) {
    const result = await this.base.post(`/${this.controllerName}/recommend`, {
      userId: userId,
    });
    if (result && result.status === 200) return result.data;
    else return [];
  }
  async getFavorite(userId, page, limit = 20) {
    const result = await this.base.get(
      `/favorites/${userId}?page=${page}&limit=${limit}`,
      {}
    );
    if (result && result.status === 200) return result.data;
  }
  async addFavorite(userId, movieId) {
    const result = await this.base.post(`/favorites`, {
      userId: parseInt(userId),
      movieId: parseInt(movieId),
    });
    if (result && result.status === 200) return result.data;
  }
  async getHistory(userId, page, limit = 20) {
    const result = await this.base.get(
      `/histories/${userId}?page=${page}&limit=${limit}`,
      {}
    );
    if (result && result.status === 200) return result.data;
  }
  async addHistory(userId, movieId) {
    const result = await this.base.post(`/histories`, {
      userId: parseInt(userId),
      movieId: parseInt(movieId),
    });
    if (result && result.status === 200) return result.data;
  }
}

export default new MovieAPI();
