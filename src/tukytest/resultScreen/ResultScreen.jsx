import "./ResultScreen.css"; // Importar los estilos CSS clásicos

import { useQuiz } from "../../context/QuizContext";
import html2canvas from "html2canvas";
import ResultOverview from "./ResultOverview/ResultOverview";
import RightAnswer from "./RightAnswer/RightAnswer";
import { NavBar } from "../../components/navbar/NavBar";
import { useEffect } from "react";

const ResultScreen = () => {
  const { result } = useQuiz();

  const correctAnswers = result
    .map((res) =>
      res.options.ESCORRECTA === "S"
        ? res.options
        : res.options.filter((ans) => ans.ESCORRECTA === "S")
    )
    .flat();

  useEffect(() => {
    const element = document.querySelector(".InnerContainer");

    html2canvas(element).then((canvas) => {
      let enlace = document.createElement("a");
      enlace.download = "Captura.png";
      enlace.href = canvas.toDataURL();
      enlace.click();
    });
  }, []);

  return (
    <>
      <NavBar type={"header"} />
      <div className="section">
        <div className="ResultScreenContainer">
          <div className="InnerContainer">
            <ResultOverview result={result} />
            {result.map(
              (
                {
                  ID,
                  TITULO,
                  CONTENIDO,
                  options,
                  selectedAnswer,
                  CALIFICACION,
                  isMatch,
                },
                index
              ) => {
                return (
                  <div key={ID} className="QuestionContainer">
                    <div className="">
                      <div className="flex">
                        <h6 className="QuestionNumber">{`${index + 1}. `}</h6>
                        <div className="QuestionTitles">
                          <span className="QuestionStyle">{TITULO}</span>
                          <span>{CONTENIDO}</span>
                        </div>
                      </div>
                      <div>
                        <ul>
                          {options.map((ans, index) => {
                            // Convert index to alphabet character
                            const label = String.fromCharCode(65 + index);
                            const correct =
                              selectedAnswer.includes(ans.TEXTO) &&
                              correctAnswers.includes(ans);
                            const wrong =
                              selectedAnswer.includes(ans.TEXTO) &&
                              !correctAnswers.includes(ans);
                            return (
                              <li
                                key={`${ans}-${index}`} // Utilizar una combinación única de ans e index
                                className={`Answer ${
                                  correct ? "correct" : ""
                                } ${wrong ? "wrong" : ""}`}
                              >
                                <span>{label}.</span>
                                {ans.TEXTO}
                              </li>
                            );
                          })}
                        </ul>
                        {/* only show if the answer is wrong */}
                        {!isMatch && (
                          <RightAnswer
                            correctAnswers={correctAnswers}
                            choices={options}
                          />
                        )}
                      </div>
                    </div>

                    <span className={`Score ${isMatch ? "right" : ""}`}>
                      {`Score ${isMatch ? CALIFICACION : 0}`}
                    </span>
                  </div>
                );
              }
            )}
          </div>
          <div className="flex flxEnd"></div>
        </div>
      </div>
    </>
  );
};

export default ResultScreen;
