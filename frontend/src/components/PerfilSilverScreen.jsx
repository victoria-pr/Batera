import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RecursosScreen from "./RecursosScreen";
import Plot from "react-plotly.js";

const PerfilSilverScreen = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const getDataById = async (silverId) => {
    try {
      const infoUser = localStorage.getItem("infoUser");
      console.log("infoUser", infoUser);
      if (!infoUser) {
        navigate("/login");
        return;
      }
      const token = JSON.parse(infoUser).token;
      const response = await axios.get(
        `http://localhost:3100/api/silvers/${silverId}`,
        {
          headers: { "x-access-token": token },
        }
      );
      console.log("LOS DATOS de agents de silvers: ", response);
      setData(response.data);
    } catch (error) {
      console.log(
        "Da este error al coger la info de agents para los perfiles silver",
        error
      );
      if (error.response.status === 401 || error.response.status === 400) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getDataById(id);
  }, [id]);

  const suma = data.loneliness_forms?.map((loneliness) => loneliness.sum);
  /* const fecha = data.loneliness_forms?.map((loneliness) => loneliness.date); */

  if (!data) return <div>Loading...</div>;
  return (
    <section>
      <h1>Perfil Silver</h1>
      <div className="silvers-container">
        <div className="silver-card">
          <h2>{data.name}</h2>
          <h2>{data.surname}</h2>
          <p>{data.address}</p>
          <p>{data.silver_id}</p>
        </div>
        <h1>Formularios</h1>
        <div className="silvers-forms">
          {data.loneliness_forms?.map((loneliness, index) => {
            return (
              <Link
                key={index}
                to={`/formularioSilver/${loneliness.lon_form_id}`}
                className="form-card"
              >
                <h2>{loneliness.loneliness_id}</h2>
                <h2>{loneliness.date}</h2>
              </Link>
            );
          })}
        </div>
      </div>
      <Link to={`/formularioSilver/${data.silver_id}/create`}>
        <button>Crear formulario</button>
      </Link>

      <h1>Gráficas</h1>
      <Plot
        data={[
          {
            type: "scatter",
            mode: "lines+markers",
          },
          {
            type: "bar",
            x: [1, 2, 3],
            y: suma,
            marker: {
              color: "#0A7F8D",
            },
            text: suma,
            textposition: "auto",
            hoverinfo: "none",
          },
        ]}
        layout={{
          width: 420,
          height: 340,
          title: "Evolución valoraciones",
          xaxis: {
            tickmode: "array",
            tickvals: [1, 2, 3],
          },
        }}
      />
    </section>
  );
};

export default PerfilSilverScreen;
