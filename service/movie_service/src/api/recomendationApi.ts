import axios from "axios";
import "dotenv/config";

const RECOMENDATION_SERVICE = process.env.RECOMMENDATION_SERVICE;

const instance = axios.create({
  baseURL: RECOMENDATION_SERVICE,
  timeout: 20000,
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

export interface ResultRecommend {
  data: Number[];
}

const getRecommendation = async (userId: Number) => {
  try {
    const result = await instance.get(`/recommend/${userId}`);
    return result.data;
  } catch (e) {
    console.log(e);
  }
};

export default getRecommendation;
