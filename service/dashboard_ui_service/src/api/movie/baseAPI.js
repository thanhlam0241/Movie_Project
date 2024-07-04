import base from "./base";

class BaseAPI {
  constructor(name) {
    this.controllerName = name;
    this.base = base;
  }

  async searchText(str, page, size) {
    const result = await this.base.post(`/${this.controllerName}/searchText`, {
      page: page,
      size: size,
      search: str ?? "",
    });
    return result.data;
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

  async insert(payload) {
    try {
      const { data } = await this.base.post(`/${this.controllerName}`, payload);
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async update(id, payload) {
    try {
      const { data } = await this.base.patch(`/${this.controllerName}/${id}`, payload);
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async delete(id) {
    try {
      const { data } = await this.base.delete(`/${this.controllerName}/${id}`);
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

export default BaseAPI;
