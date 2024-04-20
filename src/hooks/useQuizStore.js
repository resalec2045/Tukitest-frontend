import { useDispatch, useSelector } from "react-redux";

import {
  onChecking,
  onGetAllQuizs,
  onGetQuizById,
  clearErrorMessage,
  onGetQuizByGrupo,
  onGetQuestionsByQuiz,
} from "../store/quiz/quizSlice";

import tukytestApi from "../api/tukytestApi";

export const useQuizStore = () => {
  const { status, quiz, errorMessage } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();

  const startGetAllQuizs = async () => {
    dispatch(onChecking());

    try {
      const { data } = await tukytestApi.get("/quiz/getAllQuiz");

      dispatch(onGetAllQuizs({ ...data }));
    } catch (error) {
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startGetQuizById = async (id) => {
    dispatch(onChecking());

    try {
      const { data } = await tukytestApi.get(`/quiz/getQuizById/${id}`);

      dispatch(onGetQuizById({ ...data }));
    } catch (error) {
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startGetQuizByGrupo = async (grupo) => {
    dispatch(onChecking());

    try {
      const { data } = await tukytestApi.get(`/quiz/getQuizByGrupo/${grupo}`);

      dispatch(onGetQuizByGrupo({ ...data }));
    } catch (error) {
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startGetQuestionsByQuiz = async (id) => {
    dispatch(onChecking());

    try {
      const { data } = await tukytestApi.get(`/quiz/getQuestionsByQuiz/${id}`);

      dispatch(onGetQuestionsByQuiz({ ...data }));
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
    startGetQuizById,
    startGetQuizByGrupo,
    startGetQuestionsByQuiz,
  };
};
