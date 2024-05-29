import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    stringSearch: "",
  },
  reducers: {
    changeSearch: (state, action) => {
      state.stringSearch = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeSearch } = appSlice.actions;

export default appSlice.reducer;
