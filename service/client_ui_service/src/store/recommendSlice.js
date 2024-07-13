import { createSlice } from "@reduxjs/toolkit";
import movieAPI from "@/api/movie/movieAPI";

export const recommendSlice = createSlice({
  name: "recommend",
  initialState: {
    items: [],
  },
  reducers: {
    setRecommend: (state, action) => {
      state.items = action.payload.data;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRecommend } = recommendSlice.actions;

export default recommendSlice.reducer;
