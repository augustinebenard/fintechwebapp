import { createSlice } from "@reduxjs/toolkit";
import { dataList } from "./data";

 const userSlice = createSlice({
    name: "users",
    initialState: dataList,
    reducers:{
        
    }
    })

    export default userSlice.reducer;