import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  resetToken: "",
  user: {},
  fetchUserCall: true,
  logout: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveEmail: (state, { payload }) => {
      state.email = payload;
    },
    saveResetToken: (state, { payload }) => {
      state.resetToken = payload;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    changeFetchUserCall: (state, { payload }) => {
      state.fetchUserCall = payload;
    },
    setLogout: (state, { payload }) => {
      state.logout = payload;
    },
  },
});

export const { saveEmail, saveResetToken, setUser, setLogout, changeFetchUserCall } = authSlice.actions;
export default authSlice.reducer;
