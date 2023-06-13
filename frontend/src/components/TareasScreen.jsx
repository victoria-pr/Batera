import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../screens.scss";
import NavBarIcons from "./NavBarIcons";

function Tareas() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getDataById = async () => {
    try {
      const infoUser = localStorage.getItem("infoUser");
      console.log("infoUser", infoUser);
      if (!infoUser) {
        navigate("/login");
        return;
      }
      const token = JSON.parse(infoUser).token;
      const response = await axios.get("http://localhost:3100/api/agents/", {
        headers: { "x-access-token": token },
      });
      console.log("LOS DATOS de agents con sus cosas: ", response);
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
    getDataById();
  }, []);

  if (!data) return <div>Loading...</div>;
  return (
    <section className="tareassection">
      <NavBarIcons />
      <div className="tareas">
        <div className="tareas-container">
          <article className="task-article">
            <h1>Reuniones del día</h1>
            <div className="tasks-container">
              <div className="task">
                Reunión con personal
                <svg
                  viewBox="0 0 256 256"
                  xmlns="http://www.w3.org/2000/svg"
                  enable-background="new 0 0 256 256"
                  width="40"
                  height="40"
                >
                  <path
                    d="m79.2 176.1-13.1-2-3.4-36c-1-16-14.7-28.2-30.7-27.2S3.8 125.6 4.8 141.8l3.6 37.7c.7 11.4 8 21.3 18.6 25.3 2.8 1.4 5.9 2 9.1 1.9l27.5 1.3c2.8.1 5.1-2 5.2-4.7.1-2.7-2-5.1-4.7-5.2l-27.8-1.3h-.5c-1.6.1-3.1-.2-4.5-.9-.2-.1-.4-.2-.6-.2-7.1-2.6-12-9.2-12.5-16.9L14.7 141c-.6-10.5 7.4-19.5 17.9-20.2 10.6-.6 19.5 7.4 20.2 18l3.6 37.7v1.7c-.1 2.5 1.7 4.6 4.2 5l17.1 2.7c2.1.3 3.6 2.1 3.6 4.2v41.7c0 2.7 2.2 5 5 5 2.7 0 5-2.2 5-5v-41.7c-.2-7-5.2-12.9-12.1-14zM35.5 99.5c14.3 0 26-11.7 26-26s-11.7-26-26-26-26 11.7-26 26 11.7 26 26 26zm0-42.1c8.9 0 16.1 7.2 16.1 16.1s-7.2 16.1-16.1 16.1c-8.9 0-16.1-7.2-16.1-16.1s7.3-16.1 16.1-16.1zM224 110.9c-15.9-1-29.7 11.2-30.7 27l-3.4 36.2-13.1 2c-6.9 1.1-12 7-12 14v41.7c0 2.7 2.2 5 5 5s5-2.2 5-5v-41.7c0-2.1 1.5-3.8 3.6-4.2l17.1-2.7c2.5-.4 4.3-2.5 4.2-5v-1.5l3.6-38c.6-10.5 9.6-18.5 20.2-17.9 10.5.6 18.5 9.7 17.9 20l-3.6 38c-.5 7.5-5.3 14.1-12.4 16.7-.2.1-.4.2-.6.2-1.4.7-2.9 1-4.5.9h-.5l-27.8 1.3c-2.7.1-4.9 2.5-4.7 5.2.1 2.7 2.4 4.9 5.2 4.7l27.5-1.3c3.1.1 6.3-.5 9.1-1.9 10.6-4.1 17.9-14 18.6-25.2l3.6-38c.9-15.8-11.3-29.6-27.3-30.5zM220.5 99.5c14.3 0 26-11.7 26-26s-11.7-26-26-26-26 11.7-26 26 11.6 26 26 26zm0-42.1c8.9 0 16.1 7.2 16.1 16.1s-7.2 16.1-16.1 16.1c-8.9 0-16.1-7.2-16.1-16.1s7.2-16.1 16.1-16.1zM179.3 87.2V24.5c0-2.9-2.4-5.3-5.3-5.3H82c-2.9 0-5.3 2.4-5.3 5.3v62.7c0 2.9 2.4 5.3 5.3 5.3h25.7l16.8 16.8c1 1 2.2 1.5 3.5 1.5s2.5-.5 3.5-1.5l16.8-16.8H174c3 0 5.3-2.4 5.3-5.3zm-9.9-4.6h-23.2c-1.3 0-2.6.5-3.5 1.5L128 98.8 113.3 84c-.9-.9-2.2-1.5-3.5-1.5H86.6V29.2h82.8v53.4z"
                    fill="#0a7f8d"
                    class="fill-000000"
                  ></path>
                </svg>
              </div>
              <div className="task">
                Videollamada con integración Social
                <svg
                  data-name="Layer 1"
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                >
                  <path
                    d="M40.54 52.14H11.25a5.51 5.51 0 0 1-5.5-5.5V17.36a5.51 5.51 0 0 1 5.5-5.5h29.29a5.51 5.51 0 0 1 5.5 5.5v29.28a5.51 5.51 0 0 1-5.5 5.5ZM11.25 14.86a2.5 2.5 0 0 0-2.5 2.5v29.28a2.5 2.5 0 0 0 2.5 2.5h29.29a2.5 2.5 0 0 0 2.5-2.5V17.36a2.5 2.5 0 0 0-2.5-2.5Z"
                    fill="#0a7f8d"
                    class="fill-000000"
                  ></path>
                  <path
                    d="M56.75 45.25a1.44 1.44 0 0 1-.67-.16L43.87 39a1.49 1.49 0 0 1-.87-1.35V26.36a1.49 1.49 0 0 1 .87-1.36l12.21-6.11a1.49 1.49 0 0 1 2.17 1.34v23.5a1.52 1.52 0 0 1-.71 1.27 1.6 1.6 0 0 1-.79.25ZM46 36.72l9.21 4.6V22.68L46 27.29Z"
                    fill="#0a7f8d"
                    class="fill-000000"
                  ></path>
                </svg>
              </div>
            </div>
          </article>
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
          <article className="task-article">
            <h1>Valoraciones del día</h1>
            <div className="silvers-container">
              {data.silvers
                ?.map((silver, index) => {
                  return (
                    <Link
                      key={index}
                      to={`/perfilSilver/${silver.silver_id}`}
                      className="silver-card"
                    >
                      <div className="task">
                        <h2>{silver.name}</h2>
                        <h2>{silver.surname}</h2>
                        <p>{silver.city}</p>
                        <p>{silver.silver_id}</p>
                      </div>
                    </Link>
                  );
                })
                .slice(-3)}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
  return;
}

export default Tareas;
