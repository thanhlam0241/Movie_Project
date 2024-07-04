import { createSlice } from "@reduxjs/toolkit";

import movieApi from "../api/movie/movieApi.js";
import apiCredit from "../api/movie/creditApi.js";

export const movieInfo = createSlice({
  name: "movieInfo",
  initialState: {
    id: null,
    credits: [],
    videosOfficial: [],
    loading: false,
    loadingCredit: false,
    crew: [],
    cast: [],
    data: {},
  },
  reducers: {
    getMovie: async (state, action) => {
      const data = await movieApi.getById(action.payload.id);
      if (data) {
        state.data = data;
      }
    },
    getCredit: async (state, action) => {
      const dataCredit = await apiCredit.getById(action.payload);
      if (dataCredit) {
        state.crew = dataCredit.crew;
        state.cast = dataCredit.cast;
      }
    },
    setMovieInfo: (state, action) => {
      if (action.payload.id) state.id = action.payload.id;
      if (action.payload.credits) state.credits = action.payload.credits;
      if (action.payload.videosOfficial)
        state.videosOfficial = action.payload.videosOfficial;
      if (action.payload.data) state.data = action.payload.data;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMovieInfo, setId, getMovie, getCredit } = movieInfo.actions;

export default movieInfo.reducer;
