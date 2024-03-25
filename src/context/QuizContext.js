import { createContext, useContext } from 'react';
import { ScreenTypes } from '../types';

export const initialState = {
  currentScreen: ScreenTypes.SplashScreen,
  setCurrentScreen: () => {},
  quizTopic: 'react',
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
    selectedQuizTopic: 'react',
  },
};

export const QuizContext = createContext(initialState);

// eslint-disable-next-line react-refresh/only-export-components
export function useQuiz() {
  return useContext(QuizContext);
}
