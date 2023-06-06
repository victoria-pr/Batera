import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

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
    </section>
  );
}

export default Home;
