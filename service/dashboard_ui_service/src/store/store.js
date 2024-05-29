import { configureStore } from "@reduxjs/toolkit";

import appSlice from "./appSlice";
import authSlice from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    app: appSlice,
  },
});
