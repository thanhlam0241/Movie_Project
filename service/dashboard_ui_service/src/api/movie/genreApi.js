import BaseAPI from "./baseAPI";

class GenreAPI extends BaseAPI {
  constructor() {
    super("genres");
  }
}

export default new GenreAPI();
