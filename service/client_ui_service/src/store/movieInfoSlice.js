import { createSlice } from "@reduxjs/toolkit";

import movieApi from '@/api/movieApi.js'

export const movieInfo = createSlice({
    name: "movieInfo",
    initialState: {
        id: null,
        credits: [],
        videosOfficial: [],
        loading: false,
        crew: [],
    },
    reducers: {
        setMovieInfo: (state, action) => {
            state.id = action.payload.id;
            state.credits = action.payload.credits;
            state.videosOfficial = action.payload.videosOfficial;
            state.loading = false;
        },
        setId: (state, action) => {
            state.id = action.payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const { setMovieInfo, setId } = movieInfo.actions;

export default movieInfo.reducer;
