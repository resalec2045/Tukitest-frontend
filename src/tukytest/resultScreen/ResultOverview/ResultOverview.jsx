import "./ResultOverview.css";

import { useQuiz } from "../../../types";
import { convertSeconds } from "../../../utils/helpers";
import { useSelector } from "react-redux";

const ResultOverview = ({ result }) => {
  const { quiz, questions } = useSelector((state) => state.quiz);
  const { PuntuacionTotal } = quiz.quiz.find((quiz) => quiz.ID === parseInt(1));
  const { endTime } = useQuiz();

  const totalQuestionAttempted = result.length;

  const obtainedScore = result.reduce((acc, { CALIFICACION }) => {
    return acc + parseInt(CALIFICACION);
  }, 0);

  // Passed if 60 or more than 60% marks
  const calculateStatus =
    (obtainedScore / (questions.question.length * 10)) * 100 >= 60
      ? "Passed"
      : "Failed";

  return (
    <div className="ResultOverviewStyle">
      <p>
        You attempted questions:{" "}
        <span className="HighlightedText">{totalQuestionAttempted}</span> /{" "}
        {questions.question.length}
      </p>
      {/* TODO: REALIZAR */}
      <p>
        Score secured: <span className="HighlightedText">{obtainedScore}</span>
      </p>
      {/* TODO: ARREGLAR EL TIEMPO (NO FUNCINOA PORQUE CADA QUE SE RECARGA LA PANTALLA SE REINICA EL "USEQUIZ") */}
      <p>
        Time Spent:
        <span className="HighlightedText">{convertSeconds(endTime)}</span>
      </p>
      <p>
        Status: <span className="HighlightedText">{calculateStatus}</span>
      </p>
    </div>
  );
};

export default ResultOverview;
