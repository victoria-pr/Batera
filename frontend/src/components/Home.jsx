import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const [data, setData] = useState([]);
  const [loged, setLoged] = useState(localStorage.getItem("infoUser"));
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const infoUser = localStorage.getItem("infoUser");
      console.log("infoUser", infoUser);
      if (!infoUser) {
        navigate("/login");
        return;
      }
      const token = JSON.parse(infoUser).token;
      const response = await axios.get("http://localhost:3100/", {
        headers: { "x-access-token": token },
      });
      console.log("LOS DATOS : ", response);
      setData(response.data);
    } catch (error) {
      console.log("Da este error al entrar en home", error);
      if (error.response.status === 401 || error.response.status === 400) {
        navigate("/login");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("infoUser");
    setLoged(false);
    navigate("/login");
  };

  useEffect(() => {
    getData();
  }, []);

  const handleButtonClick = (route) => {
    navigate(route);
  };

  /* if (!loged) {
    navigate("/login");
  } */
  return (
    <section className="homensection">
      <div>
        <div>
          {/* <svg
            width="96"
            height="96"
            viewBox="0 0 96 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg%22%3E"
          >
            <g clip-path="url(#clip0_16_264)">
              <path
                d="M48 8C25.92 8 8 25.92 8 48C8 70.08 25.92 88 48 88C70.08 88 88 70.08 88 48C88 25.92 70.08 8 48 8ZM48 20C54.64 20 60 25.36 60 32C60 38.64 54.64 44 48 44C41.36 44 36 38.64 36 32C36 25.36 41.36 20 48 20ZM48 76.8C38 76.8 29.16 71.68 24 63.92C24.12 55.96 40 51.6 48 51.6C55.96 51.6 71.88 55.96 72 63.92C66.84 71.68 58 76.8 48 76.8Z"
                fill="#0A7F8D"
              />
            </g>
            <defs>
              <clipPath id="clip0_16_264">
                <rect width="96" height="96" fill="white" />
              </clipPath>
            </defs>
          </svg> */}
        </div>
        <button className="btns" onClick={() => handleButtonClick("/tareas")}>
          Tareas
        </button>
        <button
          className="btns"
          onClick={() => handleButtonClick("/calendario")}
        >
          Calendario
        </button>
        <button className="btns" onClick={() => handleButtonClick("/perfil")}>
          Perfil
        </button>
        <button className="btns" onClick={() => handleButtonClick("/recursos")}>
          Recursos
        </button>
        <button
          className="btns"
          onClick={() => handleButtonClick("/valoraciones")}
        >
          Mis valoraciones
        </button>
        <button className="btns" onClick={() => handleButtonClick("/boletin")}>
          Boletín
        </button>
      </div>
      {loged && (
        <button className="logOut" onClick={logout}>
          Salir
        </button>
      )}
    </section>
  );
}

export default Home;
