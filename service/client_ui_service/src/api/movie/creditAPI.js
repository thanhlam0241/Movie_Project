import BaseAPI from "./baseAPI";

class CreditAPI extends BaseAPI {
  constructor() {
    super("credits");
  }
}

export default new CreditAPI();
