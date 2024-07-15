import api from "./config";

class MovieApi {
  async getMovies() {
    try {
      const { data } = await api.get("/movie/popular");
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getMovieDetail(id) {
    try {
      const { data } = await api.get(`/movie/${id}`);
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getMovieDetailVideoOfficials(id) {
    try {
      const { data } = await api.get(`/movie/${id}/videos`);
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getMovieDetailCredits(id) {
    try {
      const { data } = await api.get(`/movie/${id}/credits`);
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getMovieDetailReviews(id) {
    try {
      const { data } = await api.get(`/movie/${id}/reviews`);
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getMovieDetailSimilar(id) {
    try {
      const { data } = await api.get(`/movie/${id}/similar`);
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getMovieDetailRecommendations(id) {
    try {
      const { data } = await api.get(`/movie/${id}/recommendations`);
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getMovieComments(id) {
    try {
      const { data } = await api.get(`/movie/${id}/comments`);
      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}

export default new MovieApi();
