import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RecursosScreen from "./RecursosScreen";
import Plot from "react-plotly.js";
import "../screens.scss";
import NavBar from "./NavBar";

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

  const suma = data.loneliness_forms?.map((loneliness) => loneliness.sum);
  /* const fecha = data.loneliness_forms?.map((loneliness) => loneliness.date); */

  if (!data) return <div>Loading...</div>;
  return (
    <section className="silversection">
      <NavBar />
      <div className="perfil">
        <div className="perfil-container">
          <article className="perfil-article">
            <h2>Número Expediente</h2>
            <h2>{data.silver_id}</h2>
          </article>
          <h2>Datos personales</h2>
          <article className="data-article">
            {/* <div className="personaldata-card"> */}
            <div className="info-card">
              <h2>Nombre</h2>
              <p>{data.name}</p>
            </div>

            <div className="info-card">
              <h2>Apellidos</h2>
              <p>{data.surname}</p>
            </div>

            <div className="info-card">
              <h2>DNI/NIE</h2>
              <p>{data.dni_nie}</p>
            </div>

            <div className="info-card">
              <h2>Fecha de Nacimiento</h2>
              <p>{data.birthday}</p>
            </div>

            <div className="info-card">
              <h2>Número S.S</h2>
              <p>{data.social_security_number}</p>
            </div>

            <div className="info-card">
              <h2>Teléfono</h2>
              <p>{data.telephone}</p>
            </div>

            <div className="info-card">
              <h2>Correo electrónico</h2>
              <p>{data.email}</p>
            </div>

            <div className="info-card">
              <h2>Domicilio</h2>
              <p>{data.address}</p>
            </div>

            <div className="info-card">
              <h2>Localidad</h2>
              <p>{data.city}</p>
            </div>

            <div className="info-card">
              <h2>CP</h2>
              <p>{data.postal_code}</p>
            </div>

            <article className="data-article">
              <h2>Persona de contacto</h2>
              <div>
                <h2>Nombre</h2>
                <p>{data.contact_person}</p>
              </div>

              <div>
                <h2>Parentesco</h2>
                <p>{data.contact_p_relation}</p>
              </div>

              <div>
                <h2>Teléfono</h2>
                <p>{data.contact_p_telephone}</p>
              </div>
            </article>
            {/*  </div> */}
          </article>
          <article className="perfil-article">
            <h2>VALORACIONES REALIZADAS</h2>
            <div className="valoration-container">
              {data.loneliness_forms?.map((loneliness, index) => {
                return (
                  <Link
                    key={index}
                    to={`/formularioSilver/${loneliness.lon_form_id}`}
                    className="valoration-card"
                  >
                    <h2>{loneliness.loneliness_id}</h2>
                    <h2>{loneliness.date}</h2>
                  </Link>
                );
              })}
            </div>
            <div className="newvaloration">
              <Link to={`/formularioSilver/${data.silver_id}/create`}>
                <button>Nueva Valoración</button>
              </Link>
            </div>
          </article>
          <div className="graphic-card">
            <h1>Gráfico</h1>
            <Plot
              data={[
                {
                  type: "scatter",
                  mode: "lines+markers",
                },
                {
                  type: "bar",
                  x: [1, 2, 3],
                  y: suma,
                  marker: {
                    color: "#0A7F8D",
                  },
                  text: suma,
                  textposition: "auto",
                  hoverinfo: "none",
                },
              ]}
              layout={{
                width: 420,
                height: 340,
                title: "Evolución valoraciones",
                xaxis: {
                  tickmode: "array",
                  tickvals: [1, 2, 3],
                },
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerfilSilverScreen;
