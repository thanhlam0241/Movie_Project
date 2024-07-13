import axios from "axios";

const BASE_URL = import.meta.env.VITE_MOVIE_SERVICE;
console.log(BASE_URL);

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 40000,
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
