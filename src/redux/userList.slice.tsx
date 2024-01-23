import { createSlice } from "@reduxjs/toolkit";
import { dataList } from "./data";

const userListSlice = createSlice({
  name: "users",
  initialState: dataList,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
    getUsers: (state) => {
      return state;
    },
    deleteUser: (state, action) => {
      const { id } = action.payload;
      const filteredUsers = state.filter((user) => user.id !== id);
      return filteredUsers;
    },
    disableOrEnableUser: (state, action) => {
      const { id } = action.payload;
      const userIndex = state.findIndex((user) => user.id === id);
      state[userIndex] = action.payload;
    },
    fundUserWallet: (state, action) => {
      const { id } = action.payload;
      const userIndex = state.findIndex((user) => user.id === id);
      state[userIndex] = action.payload;
    },
    debitFromUserWallet: (state, action) => {
      const { id } = action.payload;
      const userIndex = state.findIndex((user) => user.id === id);
      state[userIndex] = action.payload;
    },
    creditUserWallet: (state, action) => {
      const { id } = action.payload;
      const userIndex = state.findIndex((user) => user.id === id);
      state[userIndex] = action.payload;
    }
  },
});
export const { addUser, getUsers,disableOrEnableUser, deleteUser, fundUserWallet, debitFromUserWallet,creditUserWallet } =
  userListSlice.actions;
export default userListSlice.reducer;
