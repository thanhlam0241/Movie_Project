import BaseAPI from "./baseapi";

class CompanyAPI extends BaseAPI {
  constructor() {
    super("companies");
  }
}

export default new CompanyAPI();
