import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { fetchUsers } from "./redux/features/usersSlice";
import { fetchBlogs } from "./redux/features/blogsSlice";
import { Routes, Route, HashRouter } from "react-router-dom";
store.dispatch(fetchUsers());
store.dispatch(fetchBlogs());

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
