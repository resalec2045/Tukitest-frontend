import { useEffect } from "react";

export const useTimer = (
  timer,
  totalTime,
  setEndTime,
  setTimer,
  setShowTimerModal,
  showResultModal
) => {
  useEffect(() => {
    if (timer <= 0) {
      const timeTaken = totalTime;
      setEndTime(timeTaken);
      setShowTimerModal(true);
      setTimer(0);
    }
  }, [timer, totalTime, setEndTime, setShowTimerModal, setTimer]);

  useEffect(() => {
    if (!showResultModal) {
      const countTimer = setTimeout(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearTimeout(countTimer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer, setTimer]);
};
