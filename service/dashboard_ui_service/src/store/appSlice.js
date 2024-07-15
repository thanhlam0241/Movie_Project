import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    stringSearch: "",
    reload: false,
  },
  reducers: {
    changeSearch: (state, action) => {
      state.stringSearch = action.payload;
    },
    changeReload: (state, action) => {
      state.reload = !state.reload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeSearch, changeReload } = appSlice.actions;

export default appSlice.reducer;
