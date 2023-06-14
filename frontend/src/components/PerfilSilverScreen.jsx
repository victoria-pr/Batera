import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RecursosScreen from "./RecursosScreen";
import Plot from "react-plotly.js";
import "../screens.scss";
import NavBarIcons from "./NavBarIcons";

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

  if (!data) return <div>Loading...</div>;
  return (
    <section className="silversection">
      <NavBarIcons />
      <div className="perfil">
        <div className="perfil-container">
          <article className="perfil-article">
            <h2>Número Expediente</h2>
            <h2>{data.silver_id}</h2>
          </article>
          <h2 className="maindatos">Datos personales</h2>
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
            <svg
              width="600"
              height="2"
              viewBox="0 0 600 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="redline"
            >
              <line y1="1" x2="600" y2="1" stroke="#D20A11" stroke-width="2" />
            </svg>
            <article className="contact-article">
              <div>
                <h2>Nombre persona de contacto</h2>
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

          <svg
            width="800"
            height="2"
            viewBox="0 0 800 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="redline"
          >
            <line y1="1" x2="800" y2="1" stroke="#D20A11" stroke-width="2" />
          </svg>

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
                    <h2>{loneliness.date}</h2>
                    <svg viewBox="0 0 20 16" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M18 2h-8L8 0H2C.9 0 0 .9 0 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2Zm-5 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2Zm4 8H9v-1c0-1.3 2.7-2 4-2 1.3 0 4 .7 4 2v1Z"
                        fill="#0a7f8d"
                        fill-rule="evenodd"
                        class="fill-000000"
                      ></path>
                    </svg>
                  </Link>
                );
              })}

              <Link
                className="valoration-card"
                to={`/formularioSilver/${data.silver_id}/create`}
              >
                <h2 className="titulo">Nueva Valoración</h2>
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 80 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M44 20H36V36H20V44H36V60H44V44H60V36H44V20ZM40 0C17.92 0 0 17.92 0 40C0 62.08 17.92 80 40 80C62.08 80 80 62.08 80 40C80 17.92 62.08 0 40 0ZM40 72C22.36 72 8 57.64 8 40C8 22.36 22.36 8 40 8C57.64 8 72 22.36 72 40C72 57.64 57.64 72 40 72Z"
                    fill="#0A7F8D"
                  />
                </svg>
              </Link>
            </div>
          </article>
          <svg
            width="800"
            height="2"
            viewBox="0 0 800 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="redline"
          >
            <line y1="1" x2="800" y2="1" stroke="#D20A11" stroke-width="2" />
          </svg>
          <article id="graphic-article">
            <Plot
              data={[
                {
                  type: "scatter",
                  showlegend: false,
                  name: "límite",
                  mode: "lines",
                  y: [24, 24, 24, 24, 24],
                  //línea discontinua
                  line: {
                    color: "orange",
                    dash: "dot",
                  },
                  layer: "above",
                },

                {
                  type: "bar",
                  showlegend: false, //para que no aparezca la leyenda de "Índice de soledad"
                  name: "Índice de soledad",
                  x: [1, 2, 3, 4],
                  y: suma,
                  marker: {
                    color: "#0A7F8D",
                    layer: "above",
                  },
                  text: suma,
                  //aumentar el tamaño de la letra
                  textfont: {
                    size: 25,
                  },
                  textposition: "outside", // Cambio a "outside" para que aparezca en la parte de abajo
                  hoverinfo: "none",
                  layer: "above",
                },
              ]}
              layout={{
                width: 600,
                height: 500,

                title: "Evolución",
                xaxis: {
                  range: [0, 4],
                  tickmode: "array",
                  tickvals: [1, 2, 3, 4], //
                },
                yaxis: {
                  range: [10, 40],
                },
                shapes: [
                  {
                    layer: "below",
                    type: "rect",
                    xref: "paper",
                    yref: "y",
                    x0: 0,
                    y0: 0,
                    x1: 1,
                    y1: 20,
                    fillcolor: "green",
                    opacity: 0.3,
                    line: {
                      width: 0,
                    },
                  },
                  {
                    layer: "below",
                    type: "rect",
                    xref: "paper",
                    yref: "y",
                    x0: 0,
                    y0: 20,
                    x1: 1,
                    y1: 30,
                    fillcolor: "yellow",
                    opacity: 0.3,
                    line: {
                      width: 0,
                    },
                  },
                  {
                    layer: "below",
                    type: "rect",
                    xref: "paper",
                    yref: "y",
                    x0: 0,
                    y0: 30,
                    x1: 1,
                    y1: 40,
                    fillcolor: "red",
                    opacity: 0.3,
                    line: {
                      width: 0,
                    },
                  },
                ],
              }}
            />
          </article>
        </div>
      </div>
    </section>
  );
};

export default PerfilSilverScreen;
