import axios from "./base";

export const loginApi = async (dataSubmit) => {
  const { data } = await axios.post("/admin/login", dataSubmit);
  return data;
};

class AdminApi {
  async insert(dataSubmit) {
    const { data } = await axios.post("/admin", dataSubmit);
    return data;
  }

  async update(id, dataSubmit) {
    const { data } = await axios.patch("/admin/information/" + id, dataSubmit);
    return data;
  }

  async searchText(str, page, size, params) {
    params.page = page;
    params.size = size;
    const { data } = await axios.post("/admin/manage", params);
    return data;
  }
}

export default new AdminApi();
