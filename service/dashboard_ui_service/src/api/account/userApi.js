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
}
export default new UserApi();
