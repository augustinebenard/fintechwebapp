import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  data: null,
}

const userSlice = createSlice({
  name: "loggedInUser",
  initialState: initialState,
  reducers: {
    setLoggedInUserData(state, action) {
      state.data = action.payload;
    },
  },
});

export const { setLoggedInUserData } = userSlice.actions;
export default userSlice.reducer;
