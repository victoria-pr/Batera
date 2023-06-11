import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
