import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import QuizDetailsScreen from "../tukytest/QuizDetailsScreen/QuizDetailsScreen";
import QuestionScreen from "../tukytest/questionScreen/QuestionScreen";
import { Auth } from "../auth/pages/Auth";
import ResultScreen from "../tukytest/resultScreen/ResultScreen";
import { Loading } from "../components/loading/Loading";
import { useAuthStore } from "../hooks/useAuthStore";
import { useQuizStore } from "../hooks/useQuizStore";

export const AppRouter = () => {
  const { status } = useAuthStore();
  const { status: statusQuiz } = useQuizStore();

  useEffect(() => {
    // checkAuthToken();
  }, []);

  if (status === "checking") {
    return <Loading />;
  }

  if (statusQuiz === "checking") {
    return <Loading />;
  }

  return (
    <>
      <Routes>
        <>
          <Route path="/*" element={<QuizDetailsScreen />} />
          <Route path="/tukytest/test/:testId" element={<QuestionScreen />} />
          <Route path="/details" element={<QuizDetailsScreen />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/tukytestReady" element={<ResultScreen />} />
        </>
      </Routes>
    </>
  );
};
