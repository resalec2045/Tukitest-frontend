import Answer from '../Answer/Answer';
import QuizImage from '../ui/QuizImage';

import './Question.css'; 

const Question = ({
  question,
  // code,
  image,
  type,
  choices,
  selectedAnswer,
  handleAnswerSelection,
}) => {

  return (
    <div className="question-container">
      <h2 className="question-style">{question}</h2>
      {/* if question contains code snippet then show code */}
      {/* {code && <CodeSnippet code={code} language="javascript" />} */}
      {/* if question contains an image */}
      {image && <QuizImage image={image} />}
      <div className="answers-container">
        {choices.map((choice, index) => (
          <Answer
            choice={choice}
            index={index}
            key={index}
            onChange={(e) => handleAnswerSelection(e, index)}
            type={type}
            selectedAnswer={selectedAnswer}
          />
        ))}
      </div>
    </div>
  );
};

export default Question;

