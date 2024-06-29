import base from "./base";

class BaseAPI {
  controllerName = "";
  base = base;
  constructor(name) {
    this.controllerName = name;
  }

  async getById(id) {
    try {
      const { data } = await this.base.get(`/${this.controllerName}/${id}`);
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async update(id, payload) {
    try {
      const { data } = await this.base.patch(
        `/${this.controllerName}/${id}`,
        payload
      );
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

export default BaseAPI;
