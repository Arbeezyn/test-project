import { createSlice } from "@reduxjs/toolkit";
import User from "../interface/user";

const InitialState: User = {
  username: "",
  isAuth: false,
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: InitialState,
  reducers: {
    setUserData: (state, action) => {
      state.username = action.payload.username;
      state.isAuth = action.payload.isAuth;
      state.token = action.payload.token;
    },
    setSignOut: (state) => {
      state.username = "";
      state.isAuth = false;
      state.token = "";
    },
  },
});

export const { setUserData, setSignOut } = userSlice.actions;

export default userSlice.reducer;
