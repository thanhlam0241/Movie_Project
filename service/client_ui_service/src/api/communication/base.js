import { dark } from "@mui/material/styles/createPalette";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_COMMUNICATION_SERVICE;

console.log(BASE_URL);

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
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
