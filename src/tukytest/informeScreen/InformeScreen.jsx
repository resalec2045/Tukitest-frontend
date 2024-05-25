import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { NavBar } from "../../components/navbar/NavBar";
import "./InformeScreen.css";
import { useEffect, useState } from "react";
import QuizTable from "./components/QuizTable";
import axios from "axios";
import QuizTable2 from "./components/QuizTable2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const InformeScreen = () => {
  const [informe1, setInforme1] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [informe3, setInforme3] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(
          "http://localhost:5000/api/quiz/informe1"
        );
        if (response1.data.ok) {
          setInforme1(response1.data.quiz);
        }

        const response2 = await axios.get(
          "http://localhost:5000/api/quiz/informe2"
        );
        if (response2.data.ok) {
          const data = response2.data.quiz;

          // Agrupar datos por persona y sumar las notas
          const groupedData = data.reduce((acc, item) => {
            const key = `${item.CATEGORIA} (${item.TOTAL_APROBADOS})`;
            if (!acc[key]) {
              acc[key] = 0;
            }
            acc[key] += item.TOTAL_APROBADOS;
            return acc;
          }, {});

          // Preparar labels y data
          const labels = Object.keys(groupedData);
          const dataPoints = Object.values(groupedData);

          const formattedData = {
            labels,
            datasets: [
              {
                label: "Notas Totales por Persona y Grupo",
                data: dataPoints,
                backgroundColor: labels.map(
                  (_, index) =>
                    `rgba(${(index * 30) % 255}, ${(index * 60) % 255}, ${
                      (index * 90) % 255
                    }, 0.2)`
                ),
                borderColor: labels.map(
                  (_, index) =>
                    `rgba(${(index * 30) % 255}, ${(index * 60) % 255}, ${
                      (index * 90) % 255
                    }, 1)`
                ),
                borderWidth: 1,
              },
            ],
          };

          setChartData(formattedData);
        }
        const response3 = await axios.get(
          "http://localhost:5000/api/quiz/informe3"
        );
        if (response3.data.ok) {
          setInforme3(response3.data.quiz);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <NavBar type={"header"} />

      <section className="section flex-center grafico_pastel">
        <h1>Notas totales por grupo</h1>
        <div className="pastel flex-center">
          <Doughnut
            data={chartData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      </section>
      <section className="section flex-center grafico_pastel">
        <h1>Notas por persona de quiz</h1>
        <div className="container">
          <QuizTable2 data={informe3} />
        </div>
      </section>
      <section className="section flex-center grafico_pastel">
        <h1>Notas totales por grupo</h1>
        <div className="container">
          <QuizTable data={informe1} />
        </div>
      </section>
    </>
  );
};
