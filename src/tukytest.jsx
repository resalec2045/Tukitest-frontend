import './tukytest.css'
import { useEffect } from 'react'
import { useQuiz } from './types'
import { AppRouter } from './router/AppRouter';
// import QuestionScreen from './tukytest/questionScreen/QuestionScreen';

function TukyTest() {

  const {selectQuizTopic} = useQuiz();
 
  useEffect(() => {
    selectQuizTopic('react')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <AppRouter />
}

export default TukyTest
