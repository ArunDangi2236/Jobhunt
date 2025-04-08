import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice"
import jobSlice from "./jobSlice"

const store=configureStore({
    reducer:{
         authSlice,
         jobSlice
    }
})

export default store