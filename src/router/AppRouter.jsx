import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
// import { useAuthStore } from '../hooks/useAuthStore';
// import { Loading } from '../components/loading/Loading';
import QuizDetailsScreen from "../tukytest/QuizDetailsScreen/QuizDetailsScreen";
import QuestionScreen from "../tukytest/questionScreen/QuestionScreen";
import { Auth } from "../auth/pages/Auth";
import ResultScreen from "../tukytest/resultScreen/ResultScreen";
// import { useProductsStore } from '../hooks';
// import { CreateNewProduct } from '../ecommerce/pages/createProduct/CreateNewProduct';

export const AppRouter = () => {
  //   const { status, checkAuthToken, user } = useAuthStore();
  //   const { status: statusProduct } = useProductsStore();

  useEffect(() => {
    // checkAuthToken();
  }, []);

  if (status === "checking") {
    // return <Loading />;
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
