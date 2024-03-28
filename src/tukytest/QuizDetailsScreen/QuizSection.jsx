import { useNavigate } from "react-router-dom";
import { convertSeconds } from "../../utils/helpers";
import Button from "../components/ui/Button";

export const QuizSection = ({ quiz }) => {
  const navigate = useNavigate();

  const { totalQuestions, totalScore, totalTime, topic, id } = quiz;

  const goToQuestionScreen = () => {
    navigate(`/tukytest/test/${id}`);
  };
  return (
    <>
      <section className="section">
        <div className="pageCenter">
          <div className="centerCardContainer">
            <h2 className="app-title">TUKY TEST</h2>
            <div className="detail-text-container">
              <p className="detail-text">
                Selected Quiz Topic:{" "}
                <span className="highlighted-text">{topic}</span>
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
