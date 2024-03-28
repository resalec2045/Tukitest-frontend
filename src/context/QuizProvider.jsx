import { useEffect, useState } from "react";
import { QuizContext, initialState } from "./QuizContext";
import { useQuizStore } from "../hooks/useQuizStore";

const QuizProvider = ({ children }) => {
  const { quiz } = useQuizStore();

  const [timer, setTimer] = useState(initialState.timer);
  const [endTime, setEndTime] = useState(initialState.endTime);
  const [quizTopic, setQuizTopic] = useState(initialState.quizTopic);
  const [result, setResult] = useState(initialState.result);
  const [currentScreen, setCurrentScreen] = useState(
    initialState.currentScreen
  );

  const [questions, setQuestions] = useState(quiz.questions);

  const {
    questions: quizQuestions,
    totalQuestions,
    totalTime,
    totalScore,
  } = quiz;

  const selectQuizTopic = (topic) => {
    setQuizTopic(topic);
  };

  useEffect(() => {
    setTimer(totalTime);
    setQuestions(quizQuestions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizTopic]);

  const quizDetails = {
    totalQuestions,
    totalScore,
    totalTime,
    selectedQuizTopic: quizTopic,
  };

  const quizContextValue = {
    currentScreen,
    setCurrentScreen,
    quizTopic,
    selectQuizTopic,
    questions,
    setQuestions,
    result,
    setResult,
    quizDetails,
    timer,
    setTimer,
    endTime,
    setEndTime,
  };

  return (
    <QuizContext.Provider value={quizContextValue}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;
