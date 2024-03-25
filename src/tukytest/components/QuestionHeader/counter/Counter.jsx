import './Counter.css';

const Counter = ({ time }) => {
  return (
    <div className="flex center">
        <i className='bx bxs-time'></i>
        <span className="timer-style">{time}</span>
    </div>
  );
};

export default Counter;
