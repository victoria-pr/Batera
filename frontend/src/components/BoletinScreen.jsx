import React from "react";
import NavBarIcons from "./NavBarIcons";

function Boletin() {
  return (
    <div>
      <NavBarIcons />
      <div className="pdf-boletin">
        <iframe
          src="../../BOB.pdf"
          width="100%"
          height="100%"
          allow="fullscreen"
          title="Boletín"
        ></iframe>
      </div>
    </div>
  );
}

export default Boletin;
