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
      const response = await axios.get("http://localhost:3100/api/", {
        headers: { "x-access-token": token },
      });
      console.log("LOS DATOS : ", response);
      setData(response.data);
    } catch (error) {
      console.log(error);
      if (error.response.status === 401 || error.response.status === 400) {
        navigate("/login");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("infoUser");
    setLoged(false);
    navigate("/");
  };

  useEffect(() => {
    getData();
  }, []);

  const handleButtonClick = (route) => {
    navigate(route);
  };

  return (
    <section>
      <div>
        <button onClick={() => handleButtonClick("/tareas")}>Tareas</button>
        <button onClick={() => handleButtonClick("/calendario")}>
          Calendario
        </button>
        <button onClick={() => handleButtonClick("/perfil")}>Perfil</button>
        <button onClick={() => handleButtonClick("/recursos")}>Recursos</button>
        <button onClick={() => handleButtonClick("/valoraciones")}>
          Mis valoraciones
        </button>
        <button onClick={() => handleButtonClick("/boletin")}>Boletín</button>
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
