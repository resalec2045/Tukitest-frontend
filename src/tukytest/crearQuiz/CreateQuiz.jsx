import { Doughnut } from "react-chartjs-2";
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

        <Doughnut data={data} />
      </section>
    </>
  );
};

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
