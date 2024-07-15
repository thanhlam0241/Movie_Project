import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
    username: "",
    password: "",
  },
  reducers: {
    login: (state, action) => {
      state.username = action.payload.username;
      state.isLogin = true;
    },
    logout: (state) => {
      state.username = "";
      state.isLogin = false;
      localStorage.removeItem("accessToken");
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
