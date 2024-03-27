import "./ResultScreen.css"; // Importar los estilos CSS clásicos

import { useQuiz } from "../../context/QuizContext";

import Button from "../components/ui/Button";
import ResultOverview from "./ResultOverview/ResultOverview";
import RightAnswer from "./RightAnswer/RightAnswer";

const ResultScreen = () => {
  const { result } = useQuiz();

  return (
    <div className="ResultScreenContainer">
      <div className="InnerContainer">
        <ResultOverview result={result} />
        {result.map(
          (
            {
              question,
              choices,
              //   code,
              //   image,
              correctAnswers,
              selectedAnswer,
              score,
              isMatch,
            },
            index
          ) => {
            return (
              <div key={question} className="QuestionContainer">
                <div className="">
                  <div className="flex">
                    <h6 className="QuestionNumber">{`${index + 1}. `}</h6>
                    <span className="QuestionStyle">{question}</span>
                  </div>
                  <div>
                    {/* {code && <CodeSnippet code={code} language="javascript" />}
                    {image && <QuizImage image={image} />} */}
                    <ul>
                      {choices.map((ans, index) => {
                        // Convert index to alphabet character
                        const label = String.fromCharCode(65 + index);
                        const correct =
                          selectedAnswer.includes(ans) &&
                          correctAnswers.includes(ans);
                        const wrong =
                          selectedAnswer.includes(ans) &&
                          !correctAnswers.includes(ans);

                        return (
                          <li
                            key={ans}
                            className={`Answer ${correct ? "correct" : ""} ${
                              wrong ? "wrong" : ""
                            }`}
                          >
                            <span>{label}.</span>
                            {ans}
                          </li>
                        );
                      })}
                    </ul>
                    {/* only show if the answer is wrong */}
                    {!isMatch && (
                      <RightAnswer
                        correctAnswers={correctAnswers}
                        choices={choices}
                      />
                    )}
                  </div>
                </div>

                <span className={`Score ${isMatch ? "right" : ""}`}>
                  {`Score ${isMatch ? score : 0}`}
                </span>
              </div>
            );
          }
        )}
      </div>
      <div className="flex flxEnd">
        <Button
          text="RETRY"
          //   onClick={}
          //   icon={<Refresh />}
          iconPosition="left"
          bold
        />
      </div>
    </div>
  );
};

export default ResultScreen;
