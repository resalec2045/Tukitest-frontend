import { useNavigate } from "react-router-dom";
import { convertSeconds } from "../../utils/helpers";
import Button from "../components/ui/Button";
import { useQuizStore } from "../../hooks/useQuizStore";
import { useEffect } from "react";

export const QuizSection = ({ quiz }) => {
  const navigate = useNavigate();

  const { CANTIDADPREGUNTAS, PUNTUACIONTOTAL, tiempo, CATEGORIA, ID } = quiz;
  const { startGetQuestionsByQuiz } = useQuizStore();

  useEffect(() => {
    startGetQuestionsByQuiz(ID);
  }, []);

  const goToQuestionScreen = () => {
    navigate(`/tukytest/test/${ID}`);
  };

  return (
    <>
      <section className="section">
        <div className="pageCenter">
          <div className="centerCardContainer">
            <h2 className="app-title">TUKY TEST</h2>
            <div className="detail-text-container">
              <p className="detail-text">
                Tipo del Quiz:{" "}
                <span className="highlighted-text">{CATEGORIA}</span>
              </p>
              <p className="detail-text">
                Total de preguntas:{" "}
                <span className="highlighted-text">{CANTIDADPREGUNTAS}</span>
              </p>
              <p className="detail-text">
                Puntuacion total:{" "}
                <span className="highlighted-text">{PUNTUACIONTOTAL}</span>
              </p>
              <p className="detail-text">
                Tiempo total:{" "}
                <span className="highlighted-text">
                  {convertSeconds(tiempo)}
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
