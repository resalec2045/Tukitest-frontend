import "./QuizDetailsScreen.css"; // Importa los estilos CSS

import { NavBar } from "../../components/navbar/NavBar";
import { useEffect } from "react";
import { useQuizStore } from "../../hooks/useQuizStore";
import { QuizSection } from "./QuizSection";
import { Loading } from "../../components/loading/Loading";
// import { useAuthStore } from '../../hooks/useAuthStore';

const QuizDetailsScreen = () => {
  const { startGetAllQuizs, quiz } = useQuizStore();

  useEffect(() => {
    startGetAllQuizs();
  }, []);

  if (quiz.quiz === undefined) {
    return <Loading />;
  }

  const generateQuiz = () => {
    return quiz.quiz.map((quiz) => {
      return <QuizSection key={quiz.id} quiz={quiz} />;
    });
  };

  return (
    <>
      <NavBar type="header" />
      <div className="quiz-details-container">{generateQuiz()}</div>
    </>
  );
};

export default QuizDetailsScreen;
