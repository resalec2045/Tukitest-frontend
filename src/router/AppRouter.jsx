import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import QuizDetailsScreen from "../tukytest/QuizDetailsScreen/QuizDetailsScreen";
import QuestionScreen from "../tukytest/questionScreen/QuestionScreen";
import { Auth } from "../auth/pages/Auth";
import ResultScreen from "../tukytest/resultScreen/ResultScreen";
import { Loading } from "../components/loading/Loading";
import { useAuthStore } from "../hooks/useAuthStore";
import { CreateQuiz } from "../tukytest/crearQuiz/CreateQuiz";
import { InformeScreen } from "../tukytest/informeScreen/InformeScreen";
// import { useQuizStore } from "../hooks/useQuizStore";

export const AppRouter = () => {
  const { status } = useAuthStore();
  // const { status: statusQuiz } = useQuizStore();

  useEffect(() => {
    // checkAuthToken();
  }, []);

  if (status === "checking") {
    return <Loading />;
  }

  return (
    <>
      <Routes>
        <>
          <Route path="/*" element={<Auth />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/tukytest/test/:testId" element={<QuestionScreen />} />
          <Route path="/details" element={<QuizDetailsScreen />} />
          <Route path="/result" element={<ResultScreen />} />
          <Route path="/createQuiz" element={<CreateQuiz />} />
          <Route path="/informe" element={<InformeScreen />} />
        </>
      </Routes>
    </>
  );
};
