import { useState, useEffect } from 'react';
import { useQuiz } from '../../context/QuizContext';

import ModalWrapper from '../components/ui/ModalWrapper/ModalWrapper';
import Question from '../components/Question/Question';
import QuizHeader from '../components/QuestionHeader/QuizHeader';

import { ScreenTypes } from '../../types';
import { useTimer } from '../../hooks/useTimer';
import Button from '../components/ui/Button';

import './QuestionScreen.css';

const QuestionScreen = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  
  const {
    questions,
    quizDetails,
    result,
    setResult,
    setCurrentScreen,
    timer,
    setTimer,
    setEndTime,
  } = useQuiz();

  const currentQuestion = questions[activeQuestion];

  const { question, type, choices, code, image, correctAnswers } = currentQuestion;

  const onClickNext = () => {
    const isMatch =
      selectedAnswer.length === correctAnswers.length &&
      selectedAnswer.every((answer) => correctAnswers.includes(answer));

    setResult([...result, { ...currentQuestion, selectedAnswer, isMatch }]);

    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      const timeTaken = quizDetails.totalTime - timer;
      setEndTime(timeTaken);
      setShowResultModal(true);
    }
    setSelectedAnswer([]);
  };

  const handleAnswerSelection = (e) => {
    const { name, checked } = e.target;

    if (type === 'MAQs') {
      if (selectedAnswer.includes(name)) {
        setSelectedAnswer((prevSelectedAnswer) =>
          prevSelectedAnswer.filter((element) => element !== name)
        );
      } else {
        setSelectedAnswer((prevSelectedAnswer) => [...prevSelectedAnswer, name]);
      }
    }

    if (type === 'MCQs' || type === 'boolean') {
      if (checked) {
        setSelectedAnswer([name]);
      }
    }
  };

  const handleModal = () => {
    setCurrentScreen(ScreenTypes.ResultScreen);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    if (showTimerModal || showResultModal) {
      document.body.style.overflow = 'hidden';
    }
  }, [showTimerModal, showResultModal]);

  useTimer(timer, quizDetails, setEndTime, setTimer, setShowTimerModal, showResultModal);

  return (
    <>
      <div className="pageCenter">
        <div className="quiz-container">
          <QuizHeader
            activeQuestion={activeQuestion}
            totalQuestions={quizDetails.totalQuestions}
            timer={timer}
          />
          <Question
            question={question}
            code={code}
            image={image}
            choices={choices}
            type={type}
            handleAnswerSelection={handleAnswerSelection}
            selectedAnswer={selectedAnswer}
          />
          <div className="button-wrapper">
            <Button
              text={activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
              onClick={onClickNext}
              icon={<i className='bx bx-chevron-right' ></i>}
              iconPosition="right"
              disabled={selectedAnswer.length === 0}
            >
              Siguiente
            </Button>
          </div>
        </div>
        {(showTimerModal || showResultModal) && (
          <ModalWrapper
            title={showResultModal ? 'Done!' : 'Your time is up!'}
            subtitle={`You have attempted ${result.length} questions in total.`}
            onClick={handleModal}
            // icon={showResultModal ?  <><img src={CheckIcon} alt="" /></> :  <><img src={TimerIcon} alt="" /></>}
            buttonTitle="SHOW RESULT"
          />
        )}

      </div>
    </>

  );
};

export default QuestionScreen;
