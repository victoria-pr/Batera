import React, { useEffect, useState } from "react";
import PerfilSilverScreen from "./PerfilSilverScreen";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../screens.scss";

function Tareas() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getDataById = async () => {
    try {
      const infoUser = localStorage.getItem("infoUser");
      console.log("infoUser", infoUser);
      if (!infoUser) {
        navigate("/login");
        return;
      }
      const token = JSON.parse(infoUser).token;
      const response = await axios.get("http://localhost:3100/api/agents/", {
        headers: { "x-access-token": token },
      });
      console.log("LOS DATOS de agents con sus cosas: ", response);
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
    getDataById();
  }, []);

  if (!data) return <div>Loading...</div>;
  return (
    <section className="tareassection">
      <div className="tareas-container">
        <h1 className="maintitulo">TAREAS</h1>
        <article>
          <h1>Reuniones</h1>
          <div className="task">Reunión con departamento RRHH</div>
          <div className="task">Asignación proyectos 2024</div>
        </article>
        <article>
          <h1>Valoraciones del día</h1>
          <div>
            {data.silvers
              ?.map((silver, index) => {
                return (
                  <Link
                    key={index}
                    to={`/perfilSilver/${silver.silver_id}`}
                    className="silver-card"
                  >
                    <div className="task">
                      <h2>{silver.name}</h2>
                      <h2>{silver.surname}</h2>
                      <p>{silver.address}</p>
                      <p>{silver.silver_id}</p>
                    </div>
                  </Link>
                );
              })
              .slice(-3)}
          </div>
        </article>
      </div>
    </section>
  );
  return;
}

export default Tareas;
