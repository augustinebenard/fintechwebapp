import { createStore } from "redux";
import AuthReducer from "./reducer";
import { configureStore } from "@reduxjs/toolkit";

// const store = createStore(AuthReducer);

const store = configureStore({
  reducer: {
    users: AuthReducer,
  },
});

export default store;
