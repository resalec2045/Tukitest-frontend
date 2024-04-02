import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { NavBar } from "../../components/navbar/NavBar";
import { useForm } from "../../hooks/useForm";

ChartJS.register(ArcElement, Tooltip, Legend);

const quizFormFields = {
  tema: "",
  nivel: "",
  totalPreguntas: "",
  puntuacionTotal: "",
  tiempoTotal: "",
};

const questionFormFields = {
  titulo: "",
  tipo: "",
  puntuacion: "",
};

const answerFormFields = {
  respuesta: "",
  correcta: "",
};

export const CreateQuiz = () => {
  const {
    tema,
    nivel,
    totalPreguntas,
    puntuacionTotal,
    tiempoTotal,
    onInputChange: onLoginInputChange,
  } = useForm(quizFormFields);

  const {} = useForm(questionFormFields);

  const {} = useForm(answerFormFields);

  const quizSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <NavBar type={"header"} />
      <section className="section">
        <form className="form grid" onSubmit={quizSubmit}>
          <h1>Crear Quiz</h1>
          <div className="group-input">
            <i className="bx bxs-user-circle input-icon"></i>
            <input
              type="tema"
              placeholder="Tema"
              className="input input_login"
              name="loginEmail"
              value={tema}
              onChange={onLoginInputChange}
            />
          </div>

          <input className="submit-button" type="submit" value="Enviar" />
        </form>
      </section>
    </>
  );
};
