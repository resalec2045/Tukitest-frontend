import "./QuizDetailsScreen.css"; // Importa los estilos CSS

import { useQuiz } from "../../context/QuizContext";
import { convertSeconds } from "../../utils/helpers";
import Button from "../components/ui/Button";
import { NavBar } from "../../components/navbar/NavBar";
import { useNavigate } from "react-router-dom";
// import { useAuthStore } from '../../hooks/useAuthStore';

const QuizDetailsScreen = () => {
  const { quizDetails } = useQuiz();

  const navigate = useNavigate();

  const { selectedQuizTopic, totalQuestions, totalScore, totalTime } =
    quizDetails;

  const goToQuestionScreen = () => {
    navigate(`/tukytest/test/${selectedQuizTopic}`);
  };

  return (
    <>
      <NavBar type="header" />
      <section className="section">
        <div className="pageCenter">
          <div className="centerCardContainer">
            <h2 className="app-title">TUKY TEST</h2>
            <div className="detail-text-container">
              <p className="detail-text">
                Selected Quiz Topic:{" "}
                <span className="highlighted-text">{selectedQuizTopic}</span>
              </p>
              <p className="detail-text">
                Total questions to attempt:{" "}
                <span className="highlighted-text">{totalQuestions}</span>
              </p>
              <p className="detail-text">
                Score in total:{" "}
                <span className="highlighted-text">{totalScore}</span>
              </p>
              <p className="detail-text">
                Total time:{" "}
                <span className="highlighted-text">
                  {convertSeconds(totalTime)}
                </span>
              </p>
              <p className="detail-text">Ya va a comenzar su tuki test</p>
            </div>
            <Button
              text="Start"
              icon={<i className="bx bx-play"></i>}
              iconPosition="left"
              // TODO: Cambiar por ID
              onClick={goToQuestionScreen}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default QuizDetailsScreen;
