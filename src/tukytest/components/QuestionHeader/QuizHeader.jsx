import { addLeadingZero, formatTime } from "../../../utils/helpers";
import Counter from "./counter/Counter";

import "./QuizHeader.css";

const QuizHeader = ({ activeQuestion, totalQuestions, timer }) => {
  return (
    <div className="quizHeader">
      <div className="flex center">
        <div className="active-question-no">
          {addLeadingZero(activeQuestion + 1)}
        </div>
        <div className="total-question-no">
          /{addLeadingZero(totalQuestions)}
        </div>
      </div>
      <div className="flex">
        <Counter time={`${formatTime(timer)}`} />
      </div>
    </div>
  );
};

export default QuizHeader;
