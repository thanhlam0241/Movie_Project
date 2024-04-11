import { configureStore } from "@reduxjs/toolkit";

import homeSlice from "./homeSlice";
import authSlice from "./authSlice";
import appSlice from "./appSlice";
import movieInfoSlice from "./movieInfoSlice";

export const store = configureStore({
    reducer: {
        home: homeSlice,
        auth: authSlice,
        app: appSlice,
        movieInfo: movieInfoSlice,
    },
});
