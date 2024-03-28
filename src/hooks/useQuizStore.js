import { useDispatch, useSelector } from "react-redux";

import {
  onChecking,
  onCreateQuiz,
  onGetAllQuizs,
  onGetQuizById,
  clearErrorMessage,
} from "../store/quiz/quizSlice";

import tukytestApi from "../api/tukytestApi";

export const useQuizStore = () => {
  const { status, quiz, errorMessage } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();

  const startGetAllQuizs = async () => {
    dispatch(onChecking());

    try {
      const { data } = await tukytestApi.get("", {});

      dispatch(onGetAllQuizs({ ...data }));
    } catch (error) {
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startCreateQuiz = async () => {
    dispatch(onChecking());

    try {
      const { data } = await tukytestApi.post("", {});

      dispatch(onCreateQuiz({ ...data }));
    } catch (error) {
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startGetQuizById = async (id) => {
    dispatch(onChecking());

    try {
      const { data } = await tukytestApi.get("", { id });

      dispatch(onGetQuizById({ ...data }));
    } catch (error) {
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  return {
    // Propiedades
    status,
    quiz,
    errorMessage,

    // metodos
    startGetAllQuizs,
    startCreateQuiz,
    startGetQuizById,
  };
};
