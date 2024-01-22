
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";
import userListSlice from "./userList.slice";
import userSlice from "./user.slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    users: userListSlice,
    loggedInUser: userSlice,
  },
});

export default store;
