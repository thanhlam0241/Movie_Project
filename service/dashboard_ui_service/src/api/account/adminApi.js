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

  async delete(id) {
    try {
      const { data } = await this.base.delete(`/admin/${id}`);
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

export default new AdminApi();
