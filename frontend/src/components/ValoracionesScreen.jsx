import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBarIcons from "./NavBarIcons";

function Valoraciones() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getDataById = async () => {
    try {
      const infoUser = localStorage.getItem("infoUser");
      /*       console.log("infoUser", infoUser);
       */ if (!infoUser) {
        navigate("/login");
        return;
      }
      const token = JSON.parse(infoUser).token;
      const response = await axios.get(
        "https://api.batera.vickypr.es/api/agents/",
        {
          headers: { "x-access-token": token },
        }
      );
      /*       console.log("LOS DATOS de agents con sus cosas: ", response);
       */ setData(response.data);
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
    <section className="valorationssection">
      <NavBarIcons />
      <div className="valorations">
        <div className="valorations-container">
          <article className="task-article">
            <h1>Historial de valoraciones</h1>
            <div className="silvers-container">
              {data.silvers?.map((silver, index) => {
                return (
                  <Link
                    key={index}
                    to={`/perfilSilver/${silver.silver_id}`}
                    className="silver-card"
                  >
                    <div className="task">
                      <h2>{silver.name}</h2>
                      <h2>{silver.surname}</h2>
                      <p>{silver.city}</p>
                      <h2>Nº Expediente:</h2>
                      <p>{silver.silver_id}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
  return;
}

export default Valoraciones;
