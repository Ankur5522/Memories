import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./reducers/posts";
import authReducer from "./reducers/auth"

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
