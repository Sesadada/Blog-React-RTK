import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "./features/blogsSlice";
import usersSlice from "./features/usersSlice";

export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    users: usersSlice,
  },
});
