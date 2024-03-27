import "./ResultOverview.css";

import { useQuiz } from "../../../types";
import { convertSeconds } from "../../../utils/helpers";

const ResultOverview = ({ result }) => {
  const { quizDetails, endTime } = useQuiz();

  const totalQuestionAttempted = result.length;

  const obtainedScore = result
    .filter((item) => item.isMatch && typeof item.score === "number")
    .reduce(
      (accumulator, currentValue) => accumulator + (currentValue.score || 0),
      0
    );

  // Passed if 60 or more than 60% marks
  const calculateStatus =
    (obtainedScore / quizDetails.totalScore) * 100 >= 60 ? "Passed" : "Failed";

  return (
    <div className="ResultOverviewStyle">
      <p>
        You attempted questions:{" "}
        <span className="HighlightedText">{totalQuestionAttempted}</span> /{" "}
        {quizDetails.totalQuestions}
      </p>
      <p>
        Score secured: <span className="HighlightedText">{obtainedScore}</span>{" "}
        / {quizDetails.totalScore}
      </p>
      <p>
        Time Spent:{" "}
        <span className="HighlightedText">{convertSeconds(endTime)}</span>
      </p>
      <p>
        Status: <span className="HighlightedText">{calculateStatus}</span>
      </p>
    </div>
  );
};

export default ResultOverview;
