import './tukytest.css'
import { useEffect } from 'react'
import { useQuiz } from './types'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import QuizProvider from './context/QuizProvider';
import { AppRouter } from './router/AppRouter';
import { store } from './store/store';

function TukyTest() {

  const {selectQuizTopic} = useQuiz();
 
  useEffect(() => {
    selectQuizTopic('react')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename='/'>
          <QuizProvider>
            <AppRouter/>
          </QuizProvider>
        </BrowserRouter>  
      </Provider>
    </>
  )
}

export default TukyTest
