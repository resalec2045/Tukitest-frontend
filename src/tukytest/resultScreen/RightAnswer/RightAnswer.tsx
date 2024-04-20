import React from "react";
import "./RightAnswer.css";

const RightAnswer = ({ correctAnswers, choices }) => {
  return (
    <p className="RightAnswerContainer">
      {`Right ${correctAnswers.length < 2 ? "Answer" : "Answers"}: `}
      {correctAnswers.map((item, index) => {
        const label = String.fromCharCode(65 + choices.indexOf(item));

        return (
          <span key={index} className="HighlightedText">
            {`${label} (${item.TEXTO})${
              index !== correctAnswers.length - 1 ? ", " : ""
            }`}
          </span>
        );
      })}
    </p>
  );
};

export default RightAnswer;
