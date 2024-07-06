import BaseAPI from "./baseapi";

class GenreAPI extends BaseAPI {
  constructor() {
    super("genres");
  }
}

export default new GenreAPI();
