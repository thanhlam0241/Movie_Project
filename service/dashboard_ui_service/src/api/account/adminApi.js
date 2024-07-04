import axios from "./base";

export const loginApi = async (dataSubmit) => {
  const { data } = await axios.post("/admin/login", dataSubmit);
  return data;
};
