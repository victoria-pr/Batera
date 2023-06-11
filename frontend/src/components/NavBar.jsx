import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function NavBar() {
  return (
    <nav>
      <Link to="/" className="Logo">
        <img src="../logoBatera.png" className="LogoBatera" alt="Logo Batera" />
      </Link>
    </nav>
  );
}

export default NavBar;
