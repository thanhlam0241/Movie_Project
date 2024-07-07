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
    const { data } = await this.base.get(`/${this.controllerName}/${id}`);
    return data;
  }

  async insert(payload) {
    const { data } = await this.base.post(`/${this.controllerName}`, payload);
    return data;
  }

  async update(id, payload) {
    const { data } = await this.base.patch(`/${this.controllerName}/${id}`, payload);
    return data;
  }

  async delete(id) {
    const { data } = await this.base.delete(`/${this.controllerName}/${id}`);
    return data;
  }
}

export default BaseAPI;
