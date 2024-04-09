import { NavBar } from "../../components/navbar/NavBar";
import { useState } from "react";

import "./CreateQuiz.css";
import { useForm } from "../../hooks/useForm";

const quizFormField = {
  name: "",
  level: "",
  totalTime: 0,
};

const questionFormField = {
  content: "",
  grade: 0,
  isPublic: false,
  options: [{ text: "", isCorrect: false }],
};

export const CreateQuiz = () => {
  const { content, grade, isPublic, options, onInputChange, isFormValid } =
    useForm(questionFormField);
  const {
    quizName,
    level,
    totalTime,
    onInputChange: onInputChangeQuiz,
  } = useForm(quizFormField);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    content: "",
    grade: 0,
    isPublic: false,
    type: "",
    options: [{ text: "", isCorrect: false }],
  });

  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setCurrentQuestion((prevQuestion) => ({
      ...prevQuestion,
      [name]: val,
    }));
  };

  const handleOptionChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    const updatedOptions = [...currentQuestion.options];
    updatedOptions[index][name] = name === "isCorrect" ? checked : value;
    setCurrentQuestion((prevQuestion) => ({
      ...prevQuestion,
      options: updatedOptions,
    }));
  };

  const handleAddOption = () => {
    setCurrentQuestion((prevQuestion) => ({
      ...prevQuestion,
      options: [...prevQuestion.options, { text: "", isCorrect: false }],
    }));
  };

  const handleRemoveOption = (index) => {
    setCurrentQuestion((prevQuestion) => {
      const updatedOptions = [...prevQuestion.options];
      updatedOptions.splice(index, 1);
      return {
        ...prevQuestion,
        options: updatedOptions,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedQuestions = [...questions];
      updatedQuestions[editIndex] = currentQuestion;
      setQuestions(updatedQuestions);
      setEditIndex(null);
    } else {
      setQuestions((prevQuestions) => [...prevQuestions, currentQuestion]);
    }
    setCurrentQuestion({
      content: "",
      grade: 0,
      isPublic: false,
      type: "",
      options: [{ text: "", isCorrect: false }],
    });
  };

  const handleEditQuestion = (index) => {
    setCurrentQuestion(questions[index]);
    setEditIndex(index);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  return (
    <>
      <NavBar type={"header"} />

      <section className="section">
        <form className="form grid" onSubmit={handleSubmit}>
          <span className="section__title">Quiz</span>
          <span className="section__subtitle">Datos sobre el quiz</span>
          <input
            type="text"
            placeholder="Nombre del quiz"
            className="input"
            name="name"
            value={quizName}
            onChange={onInputChangeQuiz}
          />
          <input
            type="text"
            placeholder="Nivel"
            className="input"
            name="level"
            value={level}
            onChange={onInputChangeQuiz}
          />
          <input
            type="number"
            placeholder="Tiempo total (segundos)"
            className="input"
            name="totalTime"
            value={totalTime}
            onChange={onInputChangeQuiz}
          />
        </form>
      </section>

      <section className="section">
        <form className="form grid" onSubmit={handleSubmit}>
          <span className="section__title">Contenido</span>
          <input
            type="text"
            placeholder="Contenido de la pregunta"
            className="input input_content"
            name="content"
            value={currentQuestion.content}
            onChange={handleChange}
          />
          <div className="group-input_contenido">
            <input
              type="number"
              placeholder="Calificación"
              className="input input_grade"
              name="grade"
              value={currentQuestion.grade}
              onChange={handleChange}
            />
            <div className="">
              <label htmlFor="isPublic">¿Es pública?</label>
              <input
                type="checkbox"
                id="isPublic"
                name="isPublic"
                checked={currentQuestion.isPublic}
                onChange={handleChange}
              />
            </div>
          </div>

          <span className="section__title">Opciones</span>
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="options">
              <input
                className="input"
                type="text"
                placeholder={`Opción ${index + 1}`}
                name="text"
                value={option.text}
                onChange={(e) => handleOptionChange(e, index)}
              />
              <div className="options-button">
                <label>
                  <input
                    type="checkbox"
                    name="isCorrect"
                    checked={option.isCorrect}
                    onChange={(e) => handleOptionChange(e, index)}
                  />
                  Correcta
                </label>
                <button type="button" onClick={() => handleRemoveOption(index)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <div className="flex-center question_buttons">
            <button type="button" onClick={handleAddOption}>
              Agregar opción
            </button>
            <div className="button-container">
              <button type="button" onClick={handleSubmit}>
                {editIndex !== null ? "Guardar edición" : "Agregar pregunta"}
              </button>
            </div>
          </div>
          {questions.map((question, index) => (
            <div key={index} className="question-container">
              <span className="">
                <b>Pregunta {index + 1}</b>
              </span>
              <div>Contenido: {question.content}</div>
              <div>Calificación: {question.grade}</div>
              <div>¿Es pública?: {question.isPublic ? "Sí" : "No"}</div>
              <div>Tipo: {question.type}</div>
              <div>Opciones:</div>
              <ul>
                {question.options.map((option, i) => (
                  <li key={i}>
                    {option.text} - Correcta: {option.isCorrect ? "Sí" : "No"}
                  </li>
                ))}
              </ul>
              <div className="options-button">
                <button type="button" onClick={() => handleEditQuestion(index)}>
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(index)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <input className="submit-button" type="submit" value="Enviar" />
        </form>
      </section>
    </>
  );
};
