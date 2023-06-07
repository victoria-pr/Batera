import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PerfilSilverScreen = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const getDataById = async (silverId) => {
    try {
      const infoUser = localStorage.getItem("infoUser");
      console.log("infoUser", infoUser);
      if (!infoUser) {
        navigate("/login");
        return;
      }
      const token = JSON.parse(infoUser).token;
      const response = await axios.get(
        `http://localhost:3100/api/silvers/${silverId}`,
        {
          headers: { "x-access-token": token },
        }
      );
      console.log("LOS DATOS de agents de silvers: ", response);
      setData(response.data);
    } catch (error) {
      console.log(
        "Da este error al coger la info de agents para los perfiles silver",
        error
      );
      if (error.response.status === 401 || error.response.status === 400) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getDataById(id);
  }, [id]);

  if (!data) return <div>Loading...</div>;
  return (
    <section>
      <h1>Perfil Silver</h1>
      <div className="silvers-container">
        <div className="silver-card">
          <h2>{data.name}</h2>
          <h2>{data.surname}</h2>
          <p>{data.address}</p>
          <p>{data.silver_id}</p>
        </div>
      </div>
    </section>
  );
};

export default PerfilSilverScreen;
