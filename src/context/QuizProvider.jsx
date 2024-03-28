import { useEffect, useState } from "react";
import { QuizContext, initialState } from "./QuizContext";
import { quiz } from "../data/data";

const QuizProvider = ({ children }) => {
  const [timer, setTimer] = useState(initialState.timer);
  const [endTime, setEndTime] = useState(initialState.endTime);
  const [quizTopic, setQuizTopic] = useState(initialState.quizTopic);
  const [result, setResult] = useState(initialState.result);

  const [questions, setQuestions] = useState(
    quiz[initialState.quizTopic].questions
  );

  const {
    questions: quizQuestions,
    totalQuestions,
    totalTime,
    totalScore,
  } = quiz[quizTopic];

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
