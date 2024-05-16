import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN =
  import.meta.env.VITE_APP_TMDB_TOKEN || 'cd84c4545786d28c90b9eef50ad42a58';

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: { 'Authorization': "bearer " + TMDB_TOKEN, }
})

export default instance

