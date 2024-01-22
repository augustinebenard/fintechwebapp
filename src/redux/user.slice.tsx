import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  data: null,
}

const checkLoggedInUserFromSession = () => {
  var loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}").loggedInUser; 
  console.log(loggedInUser);
  
  if (loggedInUser) {
    return loggedInUser;
  }
  return initialState;
};
const userSlice = createSlice({
  name: "loggedInUser",
  initialState:  checkLoggedInUserFromSession(),
  reducers: {
    setLoggedInUserData(state, action) {
      state.data = action.payload;
    },
  },
});

export const { setLoggedInUserData } = userSlice.actions;
export default userSlice.reducer;
