import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "not-authenticated",
  user: {},
  grupo: {},
  errorMessage: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = "checking";
      state.user = {};
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }) => {
      state.status = "authenticated";
      state.user = payload;
      state.errorMessage = undefined;
    },
    onLogout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.user = {};
      state.errorMessage = payload;
    },
    onGroups: (state, { payload }) => {
      state.grupo = payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const { onChecking, onLogin, onLogout, onGroups, clearErrorMessage } =
  authSlice.actions;

export const authSliceReducer = authSlice.reducer;
