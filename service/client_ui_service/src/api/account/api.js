import axios from "./base";

export const loginApi = async (dataSubmit) => {
  try {
    const { data } = await axios.post("/user/login", dataSubmit);
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const registerApi = async (dataSubmit) => {
  try {
    const { data } = await axios.post("/user/register", dataSubmit);
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getDataById = async (id) => {
  return axios.get("/user/public/" + id);
};
