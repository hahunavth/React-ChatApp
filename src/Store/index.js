import { configureStore } from "@reduxjs/toolkit";
// import { combineReducer } from "redux";
import AuthSlice from "./Reducer/AuthSlice";

const store = configureStore({ reducer: AuthSlice });

export default store;
