import { createContext, useContext } from "react";

export const ScreenTypes = {
  SplashScreen: 0,
  QuizTopicsScreen: 1,
  QuizDetailsScreen: 2,
  QuestionScreen: 3,
  ResultScreen: 4,
};

export const initialState = {
  currentScreen: ScreenTypes.SplashScreen,
  setCurrentScreen: () => {},
  quizTopic: "React",
  selectQuizTopic: () => {},
  questions: [],
  setQuestions: () => {},
  result: [],
  setResult: () => {},
  timer: 15,
  setTimer: () => {},
  endTime: 0,
  setEndTime: () => {},
  quizDetails: {
    totalQuestions: 0,
    totalScore: 0,
    totalTime: 0,
    selectedQuizTopic: "React",
  },
};

export const QuizContext = createContext(initialState);

export function useQuiz() {
  return useContext(QuizContext);
}
