import './Answer.css';

const Answer = ({ onChange, index, choice, type, selectedAnswer }) => {
  // Convert index to alphabet character to show ABCD before question
  const label = String.fromCharCode(65 + index);

  // eslint-disable-next-line react/prop-types
  const highlightAnswer = selectedAnswer.includes(choice);

  return (
    <div className={`answer-style ${highlightAnswer ? 'highlight' : ''}`}>
      <label className="answer-label">
        <span className="choice-label">{label}</span>
        <input
          name={choice}
          // radio is for checked one option and checkbox is for checked multiple options
          type={type === 'MAQs' ? 'checkbox' : 'radio'}
          // eslint-disable-next-line react/prop-types
          checked={selectedAnswer.includes(choice)}
          onChange={onChange}
        />
        {choice}
      </label>
    </div>
  );
};

export default Answer;
