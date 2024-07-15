import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
    id: "",
    username: "",
    password: "",
    accessToken: "",
    avatar: "",
  },
  reducers: {
    login: (state, action) => {
      if (action.payload.accessToken) {
        state.username = action.payload.username;
        state.password = action.payload.password;
        state.id = action.payload.id;
        state.isLogin = true;
        state.accessToken = action.payload.accessToken;
        state.avatar = action.payload.avatar || "/src/assets/avatar.png";
      }
    },
    logout: (state) => {
      state.username = "";
      state.password = "";
      state.isLogin = false;
      state.accessToken = "";
      localStorage.removeItem("accessToken");
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
