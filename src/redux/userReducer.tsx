import { createSlice } from "@reduxjs/toolkit";
import { dataList } from "./data";

 const userSlice = createSlice({
    name: "users",
    initialState: dataList,
    reducers:{
        addUser: (state, action) => {
            state.push(action.payload);
            
        }
    }
    })
export const { addUser } = userSlice.actions;
    export default userSlice.reducer;