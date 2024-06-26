import "./QuizDetailsScreen.css"; // Importa los estilos CSS

import { NavBar } from "../../components/navbar/NavBar";
import { useEffect } from "react";
import { useQuizStore } from "../../hooks/useQuizStore";
import { QuizSection } from "./QuizSection";
import { Loading } from "../../components/loading/Loading";
import { useSelector } from "react-redux";
import { useAuthStore } from "../../hooks/useAuthStore";
// import { useAuthStore } from '../../hooks/useAuthStore';

const QuizDetailsScreen = () => {
  const { startGetQuizByGrupo, quiz } = useQuizStore();
  const { startGetGroups } = useAuthStore();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    startGetQuizByGrupo(user.usuario.ID_1);
    startGetGroups();
  }, []);

  if (quiz.quiz === undefined) {
    return <Loading />;
  }

  const generateQuiz = () => {
    return Array.from(quiz.quiz).map((quiz) => {
      return <QuizSection key={quiz.ID + quiz.NOMBRE} quiz={quiz} />;
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
