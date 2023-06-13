import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBarIcons from "./NavBarIcons";

function Perfil() {
  const [loged, setLoged] = useState(localStorage.getItem("infoUser"));
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  //Coger datos del usuario logeado de backend y pintarlos en el perfil
  const getProfileData = async () => {
    try {
      const infoUser = localStorage.getItem("infoUser");
      console.log("infoUser", infoUser);
      if (!infoUser) {
        navigate("/login");
        return;
      }
      const token = JSON.parse(infoUser).token;
      const response = await axios.get(`http://localhost:3100/api/agents`, {
        headers: { "x-access-token": token },
      });
      console.log("datos del perfil logeado: ", response);
      setData(response.data);
    } catch (error) {
      console.log("Da este error al coger la info del agent", error);
      if (error.response.status === 401 || error.response.status === 400) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  const logout = () => {
    localStorage.removeItem("infoUser");
    setLoged(false);
    navigate("/login");
  };
  return (
    <article className="perfilScreen">
      <NavBarIcons />
      <section className="perfilScreen__container">
        <div className="perfilScreen__container-datos">
          <h2>Datos del perfil</h2>

          <div className="data-container">
            <p>
              Nº de asistente: <span>{data.agent_id}</span>
            </p>
            <p>
              Nombre: <span>{data.name}</span>
            </p>
            <p>
              Apellidos: <span>{data.surname}</span>
            </p>
            <p>
              Email: <span>{data.email}</span>
            </p>
            <p>
              Telefono: <span>{data.telephone}</span>
            </p>
          </div>

          <div className="btns-container">
            {loged && (
              <button className="logOut" onClick={logout}>
                Cerrar sesión
              </button>
            )}
          </div>
        </div>
      </section>
    </article>
  );
}

export default Perfil;
