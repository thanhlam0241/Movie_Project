import axios from "axios";
const API_KEY = "AIzaSyCLJyKOcGtQol9vHRIgOq3YUsInPeBoUSs";

const query = (title) => {
  return `?part=snippet&maxResults=1&q=${title}&safeSearch=strict&regionCode=gp&type=video&videoDuration=long&key=${API_KEY}`;
};

const buildUrl = (id) => {
  return `https://www.youtube.com/watch?v=${id}`;
};

const instance = axios.create({
  baseURL: "https://youtube.googleapis.com",
  timeout: 10000,
});

const getUrlByTitle = async (title) => {
  try {
    const result = await instance.get(`/youtube/v3/search${query(title)}`);
    if (result && result.data) {
      return buildUrl(result.data.items[0].id.videoId);
    }
  } catch (ex) {
    console.log(ex);
  }
};

export default getUrlByTitle;
