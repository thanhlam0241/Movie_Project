import { configureStore } from "@reduxjs/toolkit";

import appSlice from "store/appslice.js";
import authSlice from "store/authslice.js";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    app: appSlice,
  },
});
