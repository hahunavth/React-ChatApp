import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "user",
  initialState: {
    user: { name: "ha" },
  },
  reducers: {
    setUser: (state, action) => {
      state = action.user;
    },
    removeUser: (state, action) => {
      state = {};
    },
  },
});

//Export selector
export const userSelector = (state) => state.user;
//Export action
export const { getUser, removeUser, setUser } = authSlice.actions;
//Export reducer
export default authSlice.reducer;
