import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function NavBar() {
  return (
    <nav className="navBar1">
      <div className="logo-container">
        <Link to="/" className="enlace">
          <img
            src="../../logoBatera.png"
            className="LogoBatera"
            alt="Logo Batera"
          />
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
