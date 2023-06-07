import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PerfilSilverScreen = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const getDataById = async (formId) => {
    try {
      const infoUser = localStorage.getItem("infoUser");
      console.log("infoUser", infoUser);
      if (!infoUser) {
        navigate("/login");
        return;
      }
      const token = JSON.parse(infoUser).token;
      const response = await axios.get(
        `http://localhost:3100/api/lonelyForms/${formId}`,
        {
          headers: { "x-access-token": token },
        }
      );
      console.log("DATOS DE LOS formularios: ", response);
      setData(response.data);
    } catch (error) {
      console.log("Da este error al coger la info de FORMS", error);
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
      <h1>Formulario</h1>
      <div className="form-container">
        <div className="form-card">
          <p>{data.lon_form_id}</p>
          <h2>{data.date}</h2>
          <h2>{data.q1}</h2>
          <p>{data.q2}</p>
          <p>{data.q3}</p>
          <p>{data.q4}</p>
          <p>{data.q5}</p>
          <p>{data.q6}</p>
          <p>{data.q7}</p>
          <p>{data.q8}</p>
          <p>{data.q9}</p>
          <p>{data.q10}</p>
          <p>{data.sum}</p>
          <p>{data.observations}</p>
        </div>
      </div>
    </section>
  );
};

export default PerfilSilverScreen;
