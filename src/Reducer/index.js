import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../Slices/authSlices'
import profileReducer from "../Slices/profileSlice";
import cartReducer from "../Slices/cartSlice";

const rootReducer=combineReducers({
    auth:authReducer,
    profile:profileReducer,
    cart:cartReducer,
})

export default rootReducer;