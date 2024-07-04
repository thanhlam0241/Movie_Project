import BaseAPI from "./baseAPI";

class CompanyAPI extends BaseAPI {
  constructor() {
    super("companies");
  }
}

export default new CompanyAPI();
