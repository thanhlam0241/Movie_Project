import BaseAPI from "./baseapi";

class GenreAPI extends BaseAPI {
  constructor() {
    super("genres");
  }
  async getAll() {
    const result = await this.base.get(`/${this.controllerName}/all`);
    return result.data;
  }
}

export default new GenreAPI();
