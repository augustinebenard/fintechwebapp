
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";
import userListSlice from "./userList.slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    users: userListSlice,
  },
});

export default store;
