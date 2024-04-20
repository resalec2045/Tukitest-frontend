import { useState, useEffect } from "react";
import { useQuiz } from "../../context/QuizContext";

import ModalWrapper from "../components/ui/ModalWrapper/ModalWrapper";
import Question from "../components/Question/Question";
import QuizHeader from "../components/QuestionHeader/QuizHeader";

// import { ScreenTypes } from "../../types";
import { useTimer } from "../../hooks/useTimer";
import Button from "../components/ui/Button";

import "./QuestionScreen.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const QuestionScreen = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);

  const navigate = useNavigate();
  const { testId } = useParams();
  const { result, setResult, timer, setTimer, setEndTime } = useQuiz();

  const { quiz, questions } = useSelector((state) => state.quiz);
  const { TIEMPO } = quiz.quiz.find((quiz) => quiz.ID === parseInt(testId));

  useEffect(() => {
    setTimer(TIEMPO);
  }, []);

  const currentQuestion = questions.question[activeQuestion];

  const {
    CONTENIDO,
    type = "MAQs",
    options,
    correctAnswers = options.filter((option) => option.ESCORRECTA === "S"),
  } = currentQuestion;

  const onClickNext = () => {
    const isMatch =
      selectedAnswer.length === correctAnswers.length &&
      selectedAnswer.every((answer) =>
        correctAnswers.every((ans) => ans.TEXTO === answer)
      );

    setResult([...result, { ...currentQuestion, selectedAnswer, isMatch }]);

    if (activeQuestion !== questions.question.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      const timeTaken = TIEMPO - timer;
      console.log("timeTaken", timeTaken);
      setEndTime(timeTaken);
      setShowResultModal(true);
    }
    setSelectedAnswer([]);
  };

  const handleAnswerSelection = (e) => {
    const { name, checked } = e.target;

    if (type === "MAQs") {
      if (selectedAnswer.includes(name)) {
        setSelectedAnswer((prevSelectedAnswer) =>
          prevSelectedAnswer.filter((element) => element !== name)
        );
      } else {
        setSelectedAnswer((prevSelectedAnswer) => [
          ...prevSelectedAnswer,
          name,
        ]);
      }
    }

    if (type === "MCQs" || type === "boolean") {
      if (checked) {
        setSelectedAnswer([name]);
      }
    }
  };

  const handleModal = () => {
    document.body.style.overflow = "";
    navigate("/result");
  };

  useEffect(() => {
    if (showTimerModal || showResultModal) {
      document.body.style.overflow = "hidden";
    }
  }, [showTimerModal, showResultModal]);

  useTimer(
    timer,
    TIEMPO,
    setEndTime,
    setTimer,
    setShowTimerModal,
    showResultModal
  );

  return (
    <>
      <section className="section">
        <div className="pageCenter">
          <div className="quiz-container">
            <QuizHeader
              activeQuestion={activeQuestion}
              totalQuestions={questions.question.length}
              timer={timer}
            />
            <Question
              question={CONTENIDO}
              choices={options.map((option) => option.TEXTO)}
              type={type}
              handleAnswerSelection={handleAnswerSelection}
              selectedAnswer={selectedAnswer}
            />
            <div className="button-wrapper">
              <Button
                text={
                  activeQuestion === questions.length - 1 ? "Finish" : "Next"
                }
                onClick={onClickNext}
                icon={<i className="bx bx-chevron-right"></i>}
                iconPosition="right"
                disabled={selectedAnswer.length === 0}
              >
                Siguiente
              </Button>
            </div>
          </div>
          {(showTimerModal || showResultModal) && (
            <ModalWrapper
              title={showResultModal ? "Done!" : "Your time is up!"}
              subtitle={`You have attempted ${result.length} questions in total.`}
              onClick={handleModal}
              // icon={showResultModal ?  <><img src={CheckIcon} alt="" /></> :  <><img src={TimerIcon} alt="" /></>}
              buttonTitle="SHOW RESULT"
            />
          )}
        </div>
      </section>
    </>
  );
};

export default QuestionScreen;
