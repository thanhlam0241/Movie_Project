import { configureStore } from "@reduxjs/toolkit";

import homeSlice from "./homeSlice";
import authSlice from "./authSlice";
import appSlice from "./appSlice";
import movieInfoSlice from "./movieInfoSlice";
import recommendSlice from "./recommendSlice";

export const store = configureStore({
  reducer: {
    home: homeSlice,
    auth: authSlice,
    app: appSlice,
    movieInfo: movieInfoSlice,
    recommend: recommendSlice,
  },
});
