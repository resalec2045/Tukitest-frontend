import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "not-ready",
  quiz: {},
  errorMessage: undefined,
};

export const quizsSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = "checking";
      state.errorMessage = undefined;
    },
    onCreateQuiz: (state, { payload }) => {
      state.status = "checking";
      state.quiz = payload;
      state.errorMessage = undefined;
    },
    onGetAllQuizs: (state, { payload }) => {
      state.status = "ready";
      state.quiz = payload;
      state.errorMessage = undefined;
    },
    onGetQuizById: (state, { payload }) => {
      state.status = "ready";
      state.quiz = payload;
      state.errorMessage = undefined;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const {
  onChecking,
  onCreateQuiz,
  onGetAllQuizs,
  onGetQuizById,
  clearErrorMessage,
} = quizsSlice.actions;

export const quizsSliceReducer = quizsSlice.reducer;
