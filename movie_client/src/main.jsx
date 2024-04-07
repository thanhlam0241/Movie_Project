import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";

import { store } from "./store/store";
import { Provider } from "react-redux";
import ThemeProvider from '@/provider/mui';

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </Provider>
);
