import React from 'react'
import ReactDOM from 'react-dom/client'
import TukyTest from './tukytest'
import QuizProvider from './context/QuizProvider'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename='/'>
      <QuizProvider>
        <TukyTest />
      </QuizProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
