import axios from "axios";

const BASE_URL = process.env.REACT_APP_MOVIE_SERVICE;
console.log(BASE_URL);

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
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
