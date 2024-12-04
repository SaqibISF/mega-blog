import { AuthState, UserData } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  status: false,
  userData: null,
  isStatusLoadedOnce: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserData>) => {
      state.status = true;
      state.isStatusLoadedOnce = true;
      state.userData = action.payload;
    },

    logout: (state) => {
      state.status = false;
      state.userData = null;
    },

    statusLoaded: (state) => {
      state.isStatusLoadedOnce = true;
    },
  },
});

export const { login, statusLoaded, logout } = authSlice.actions;

export default authSlice.reducer;
