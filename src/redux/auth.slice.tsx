import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedInUser: null,
  isLoggedIn: false,
};

const checkLoggedInUserFromSession = () => {
  const loggedInUser = sessionStorage.getItem("loggedInUser");
  if (loggedInUser) {
    return JSON.parse(loggedInUser);
  }
  return initialState;
};

const authSlice = createSlice({
  name: "auth",
  initialState: checkLoggedInUserFromSession(),
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.loggedInUser = action.payload;
      sessionStorage.setItem("loggedInUser", JSON.stringify(state));
    },
    logout(state) {
      state.loggedInUser = null;
      state.isLoggedIn = false;
      sessionStorage.removeItem("loggedInUser");
    },
    updateLoggedInUser(state, action) {
      state.loggedInUser = action.payload;
      sessionStorage.setItem("loggedInUser", JSON.stringify(state));
    }
  },
});



export const authActions = authSlice.actions;

export default authSlice.reducer;
