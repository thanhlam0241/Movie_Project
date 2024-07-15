import BaseAPI from "./baseapi";

class CreditAPI extends BaseAPI {
  constructor() {
    super("credits");
  }
}

export default new CreditAPI();
