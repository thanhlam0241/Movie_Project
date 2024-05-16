import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
    name: "app",
    initialState: {
        sidebar: false,
        filter: false
    },
    reducers: {
        toggleSidebar: (state) => {
            state.sidebar = !state.sidebar;
        },
        toggleFilter: (state) => {
            state.filter = !state.filter;
        },
    },
});

// Action creators are generated for each case reducer function
export const { toggleSidebar, toggleFilter } = appSlice.actions;

export default appSlice.reducer;
