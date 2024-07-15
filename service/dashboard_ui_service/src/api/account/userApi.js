import axios from "./base";

class UserApi {
  async searchText(str, page, size) {
    const result = await axios.post(`/user/search`, {
      page: page,
      size: size,
      search: str ?? "",
    });
    return result.data;
  }
  async getDataById(id) {
    return axios.get("/user/public/" + id);
  }
  async insert(payload) {
    try {
      const { data } = await this.base.post(`/user`, payload);
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async delete(id) {
    try {
      const { data } = await this.base.delete(`/user/${id}`);
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async update(id, payload) {
    try {
      const { data } = await this.base.patch(`/user/${id}`, payload);
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
export default new UserApi();
