import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBarIcons from "./NavBarIcons";

function Perfil() {
  const [loged, setLoged] = useState(localStorage.getItem("infoUser"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("infoUser");
    setLoged(false);
    navigate("/login");
  };
  return (
    <div>
      <NavBarIcons />
      Perfil
      {loged && (
        <button className="logOut" onClick={logout}>
          Salir
        </button>
      )}
    </div>
  );
}

export default Perfil;
