import { configureStore } from "@reduxjs/toolkit";

import appSlice from "store/appslice";
import authSlice from "store/authslice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    app: appSlice,
  },
});
