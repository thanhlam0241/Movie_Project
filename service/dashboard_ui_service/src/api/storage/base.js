import axios from "axios";

const BASE_URL = process.env.REACT_APP_STORAGE_SERVICE;

console.log(BASE_URL);

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default instance;
