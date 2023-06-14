import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../screens.scss";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleButtonClick = (route) => {
    navigate(route);
  };

  useEffect(() => {
    const btns = document.querySelectorAll(".btns");
    btns.forEach((btn) => {
      const btnRoute = btn.getAttribute("data-route");
      if (btnRoute === location.pathname) {
        btn.classList.add("btns-selected");
        if (btn.classList.contains("btns-selected")) {
          btn.classList.remove("btns");
        }
      } else {
        btn.classList.remove("btns-selected");
      }
    });
  }, [location]);

  return (
    <nav className="navBar">
      <div className="logo-container">
        <Link to="/" className="enlace">
          <img
            src="../../logoBatera3.png"
            className="LogoBatera"
            alt="Logo Batera"
          />
        </Link>
      </div>

      <div className="iconos">
        <div
          className={`btns`}
          onClick={() => handleButtonClick("/tareas")}
          data-route="/tareas"
        >
          <img src="../../tareasIcon.png" />
        </div>
        <div
          className={`btns`}
          onClick={() => handleButtonClick("/calendario")}
          data-route="/calendario"
        >
          <img src="../../calendarIcon.png" />
        </div>
        <div
          className={`btns`}
          onClick={() => handleButtonClick("/perfil")}
          data-route="/perfil"
        >
          <img src="../../perfilIcon.png" />
        </div>
        <div
          className={`btns`}
          onClick={() => handleButtonClick("/recursos")}
          data-route="/recursos"
        >
          <img src="../../recursosIcon.png" />
        </div>
        <div
          className={`btns`}
          onClick={() => handleButtonClick("/valoraciones")}
          data-route="/valoraciones"
        >
          <img src="../../valorationIcon.png" />
        </div>
        <div
          className={`btns`}
          onClick={() => handleButtonClick("/boletin")}
          data-route="/boletin"
        >
          <img src="../../boletinIcon.png" />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
