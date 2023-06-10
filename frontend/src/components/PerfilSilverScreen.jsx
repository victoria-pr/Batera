import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const PerfilSilverScreen = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [showFormResource, setShowFormResource] = useState(false);
  const [boardGames, setBoardGames] = useState(0);
  const [coffeNChat, setCoffeNChat] = useState(0);
  const [cooking, setCooking] = useState(0);
  const [cycling, setCycling] = useState(0);
  const [careCenter, setCareCenter] = useState(0);
  const [garden, setGarden] = useState(0);
  const [homeAssistance, setHomeAssistance] = useState(0);
  const [phoneAssistance, setPhoneAssistance] = useState(0);
  const [reading, setReading] = useState(0);
  const [walking, setWalking] = useState(0);
  const [movie, setMovie] = useState(0);

  const [selectedOptions, setSelectedOptions] = useState([]);

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

  const createNewResource = async (silverId) => {
    try {
      const infoUser = localStorage.getItem("infoUser");
      console.log("infoUser", infoUser);
      if (!infoUser) {
        navigate("/login");
        return;
      }
      const token = JSON.parse(infoUser).token;

      const requestData = {
        board_games: selectedOptions.includes("board_games") ? 1 : 0,
        cofee_n_chat: selectedOptions.includes("cofee_n_chat") ? 1 : 0,
        cooking_group: selectedOptions.includes("cooking_group") ? 1 : 0,
        cycling_group: selectedOptions.includes("cycling_group") ? 1 : 0,
        day_care_center: selectedOptions.includes("day_care_center") ? 1 : 0,
        garden_group: selectedOptions.includes("garden_group") ? 1 : 0,
        home_assistance: selectedOptions.includes("home_assistance") ? 1 : 0,
        phone_assistance: selectedOptions.includes("phone_assistance") ? 1 : 0,
        reading_club: selectedOptions.includes("reading_club") ? 1 : 0,
        walking_club: selectedOptions.includes("walking_club") ? 1 : 0,
        movie_club: selectedOptions.includes("movie_club") ? 1 : 0,
      };

      const response = await axios.post(
        `http://localhost:3100/api/resources/${silverId}/create`,
        requestData,
        {
          headers: { "x-access-token": token },
        }
      );
      console.log("LOS DATOS de crear resource: ", response);
      setData(response.data);
    } catch (error) {
      console.log("Da este error al hacer el axios de crear resource", error);
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
        <h1>Formularios</h1>
        <div className="silvers-forms">
          {data.loneliness_forms?.map((loneliness, index) => {
            return (
              <Link
                key={index}
                to={`/formularioSilver/${loneliness.lon_form_id}`}
                className="form-card"
              >
                <h2>{loneliness.loneliness_id}</h2>
                <h2>{loneliness.date}</h2>
              </Link>
            );
          })}
        </div>
      </div>
      <Link to={`/formularioSilver/${data.silver_id}/create`}>
        <button>Crear formulario</button>
      </Link>
      <h1>Recursos</h1>
      <div className="silvers-resources">
        {data.resources?.map((resource, index) => {
          return (
            <div key={index} className="resources-card">
              <div className="id-resources">
                <h2>Nº de adjudicación</h2>
                <h3>{resource.resources_id}</h3>
              </div>
              <div className="resources-particular">
                {resource.board_games === 1 ? (
                  <div className="resource-particular-card">
                    <h2>Juegos de mesa</h2>
                  </div>
                ) : null}
                {resource.cofee_n_chat === 1 ? (
                  <div className="resource-particular-card">
                    <h2>Café y charla</h2>
                  </div>
                ) : null}
                {resource.cooking_group === 1 ? (
                  <div className="resource-particular-card">
                    <h2>Grupo de cocina</h2>
                  </div>
                ) : null}
                {resource.cycling_group === 1 ? (
                  <div className="resource-particular-card">
                    <h2>Grupo de ciclistas</h2>
                  </div>
                ) : null}
                {resource.day_care_center === 1 ? (
                  <div className="resource-particular-card">
                    <h2>Centro de día</h2>
                  </div>
                ) : null}
                {resource.garden_group === 1 ? (
                  <div className="resource-particular-card">
                    <h2>Grupo de jardinería</h2>
                  </div>
                ) : null}
                {resource.home_assistance === 1 ? (
                  <div className="resource-particular-card">
                    <h2>Asistencia domiciliaria</h2>
                  </div>
                ) : null}
                {resource.phone_assistance === 1 ? (
                  <div className="resource-particular-card">
                    <h2>Asistencia telefónica</h2>
                  </div>
                ) : null}
                {resource.movie_club === 1 ? (
                  <div className="resource-particular-card">
                    <h2>Club de cine</h2>
                  </div>
                ) : null}
                {resource.reading_club === 1 ? (
                  <div className="resource-particular-card">
                    <h2>Club de lectura</h2>
                  </div>
                ) : null}
                {resource.walking_club === 1 ? (
                  <div className="resource-particular-card">
                    <h2>Club de paseo</h2>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {showFormResource ? (
        <div className="new-resource">
          <form>
            <button
              type="button"
              name="board_games"
              id="board_games"
              className={
                selectedOptions.includes("board_games") ? "selected" : ""
              }
              onClick={() => {
                if (selectedOptions.includes("board_games")) {
                  setSelectedOptions(
                    selectedOptions.filter((option) => option !== "board_games")
                  );
                } else {
                  setSelectedOptions([...selectedOptions, "board_games"]);
                }
              }}
            >
              Juegos de mesa
            </button>

            <button
              type="button"
              name="cofee_n_chat"
              id="cofee_n_chat"
              className={
                selectedOptions.includes("cofee_n_chat") ? "selected" : ""
              }
              onClick={() => {
                if (selectedOptions.includes("cofee_n_chat")) {
                  setSelectedOptions(
                    selectedOptions.filter(
                      (option) => option !== "cofee_n_chat"
                    )
                  );
                } else {
                  setSelectedOptions([...selectedOptions, "cofee_n_chat"]);
                }
              }}
            >
              Café y charlas
            </button>

            <button
              type="button"
              name="cooking_group"
              id="cooking_group"
              className={
                selectedOptions.includes("cooking_group") ? "selected" : ""
              }
              onClick={() => {
                if (selectedOptions.includes("cooking_group")) {
                  setSelectedOptions(
                    selectedOptions.filter(
                      (option) => option !== "cooking_group"
                    )
                  );
                } else {
                  setSelectedOptions([...selectedOptions, "cooking_group"]);
                }
              }}
            >
              Grupo de cocina
            </button>

            <button
              type="button"
              name="cycling_group"
              id="cycling_group"
              className={
                selectedOptions.includes("cycling_group") ? "selected" : ""
              }
              onClick={() => {
                if (selectedOptions.includes("cycling_group")) {
                  setSelectedOptions(
                    selectedOptions.filter(
                      (option) => option !== "cycling_group"
                    )
                  );
                } else {
                  setSelectedOptions([...selectedOptions, "cycling_group"]);
                }
              }}
            >
              Grupo de ciclistas
            </button>

            <button
              type="button"
              name="day_care_center"
              id="day_care_center"
              className={
                selectedOptions.includes("day_care_center") ? "selected" : ""
              }
              onClick={() => {
                if (selectedOptions.includes("day_care_center")) {
                  setSelectedOptions(
                    selectedOptions.filter(
                      (option) => option !== "day_care_center"
                    )
                  );
                } else {
                  setSelectedOptions([...selectedOptions, "day_care_center"]);
                }
              }}
            >
              Centro de día
            </button>

            <button
              type="button"
              name="garden_group"
              id="garden_group"
              className={
                selectedOptions.includes("garden_group") ? "selected" : ""
              }
              onClick={() => {
                if (selectedOptions.includes("garden_group")) {
                  setSelectedOptions(
                    selectedOptions.filter(
                      (option) => option !== "garden_group"
                    )
                  );
                } else {
                  setSelectedOptions([...selectedOptions, "garden_group"]);
                }
              }}
            >
              Grupo de jardinería
            </button>

            <button
              type="button"
              name="home_assistance"
              id="home_assistance"
              className={
                selectedOptions.includes("home_assistance") ? "selected" : ""
              }
              onClick={() => {
                if (selectedOptions.includes("home_assistance")) {
                  setSelectedOptions(
                    selectedOptions.filter(
                      (option) => option !== "home_assistance"
                    )
                  );
                } else {
                  setSelectedOptions([...selectedOptions, "home_assistance"]);
                }
              }}
            >
              Asistencia domiciliaria
            </button>

            <button
              type="button"
              name="phone_assistance"
              id="phone_assistance"
              className={
                selectedOptions.includes("phone_assistance") ? "selected" : ""
              }
              onClick={() => {
                if (selectedOptions.includes("phone_assistance")) {
                  setSelectedOptions(
                    selectedOptions.filter(
                      (option) => option !== "phone_assistance"
                    )
                  );
                } else {
                  setSelectedOptions([...selectedOptions, "phone_assistance"]);
                }
              }}
            >
              Asistencia telefónica
            </button>

            <button
              type="button"
              name="reading_club"
              id="reading_club"
              className={
                selectedOptions.includes("reading_club") ? "selected" : ""
              }
              onClick={() => {
                if (selectedOptions.includes("reading_club")) {
                  setSelectedOptions(
                    selectedOptions.filter(
                      (option) => option !== "reading_club"
                    )
                  );
                } else {
                  setSelectedOptions([...selectedOptions, "reading_club"]);
                }
              }}
            >
              Club de lectura
            </button>

            <button
              type="button"
              name="walking_club"
              id="walking_club"
              className={
                selectedOptions.includes("walking_club") ? "selected" : ""
              }
              onClick={() => {
                if (selectedOptions.includes("walking_club")) {
                  setSelectedOptions(
                    selectedOptions.filter(
                      (option) => option !== "walking_club"
                    )
                  );
                } else {
                  setSelectedOptions([...selectedOptions, "walking_club"]);
                }
              }}
            >
              Grupo de caminar
            </button>

            <button
              type="button"
              name="movie_club"
              id="movie_club"
              className={
                selectedOptions.includes("movie_club") ? "selected" : ""
              }
              onClick={() => {
                if (selectedOptions.includes("movie_club")) {
                  setSelectedOptions(
                    selectedOptions.filter((option) => option !== "movie_club")
                  );
                } else {
                  setSelectedOptions([...selectedOptions, "movie_club"]);
                }
              }}
            >
              Club de cine
            </button>

            <button
              onClick={() => {
                createNewResource(id);
              }}
            >
              Crear recurso
            </button>
          </form>
        </div>
      ) : null}

      {showFormResource ? (
        <button onClick={() => setShowFormResource(!showFormResource)}>
          Cancelar
        </button>
      ) : null}
      {!showFormResource ? (
        <button
          onClick={() => {
            setShowFormResource(!showFormResource);
          }}
        >
          Nuevo recurso
        </button>
      ) : null}
    </section>
  );
};

export default PerfilSilverScreen;

/* {showFormResource ? (
        <div className="new-resource">
          <form>
            <label htmlFor="board_games">Juegos de mesa</label>
            <input
              type="button"
              name="board_games"
              id="board_games"
              onChange={() => setBoardGames(1)}
              checked={boardGames}
            />
            <label htmlFor="cofee_n_chat">Café y charla</label>
            <input
              type="button"
              name="cofee_n_chat"
              id="cofee_n_chat"
              onChange={() => setCoffeNChat(1)}
              checked={coffeNChat}
            />
            <label htmlFor="cooking_group">Grupo de cocina</label>
            <input
              type="button"
              name="cooking_group"
              id="cooking_group"
              onChange={() => setCooking(1)}
              checked={cooking}
            />
            <label htmlFor="cycling_group">Grupo de ciclistas</label>
            <input
              type="button"
              name="cycling_group"
              id="cycling_group"
              onChange={() => setCycling(1)}
              checked={cycling}
            />
            <label htmlFor="day_care_center">Centro de día</label>
            <input
              type="button"
              name="day_care_center"
              id="day_care_center"
              onChange={() => setCareCenter(1)}
              checked={careCenter}
            />
            <label htmlFor="garden_group">Grupo de jardinería</label>
            <input
              type="button"
              name="garden_group"
              id="garden_group"
              onChange={() => setGarden(1)}
              checked={garden}
            />
            <label htmlFor="home_assistance">Asistencia domiciliaria</label>
            <input
              type="button"
              name="home_assistance"
              id="home_assistance"
              onChange={() => setHomeAssistance(1)}
              checked={homeAssistance}
            />
            <label htmlFor="phone_assistance">Asistencia telefónica</label>
            <input
              type="button"
              name="phone_assistance"
              id="phone_assistance"
              onChange={() => setPhoneAssistance(1)}
              checked={phoneAssistance}
            />
            <label htmlFor="movie_club">Club de cine</label>
            <input
              type="button"
              name="movie_club"
              id="movie_club"
              onChange={() => setMovie(1)}
              checked={movie}
            />
            <label htmlFor="reading_club">Club de lectura</label>
            <input
              type="button"
              name="reading_club"
              id="reading_club"
              onChange={() => setReading(1)}
              checked={reading}
            />
            <label htmlFor="walking_club">Club de paseo</label>
            <input
              type="button"
              name="walking_club"
              id="walking_club"
              onChange={() => setWalking(1)}
              checked={walking}
            />
            <button
              onClick={() => {
                createNewResource(id);
              }}
            >
              Crear recurso
            </button>
          </form>
        </div>
      ) : null} */

/* <form>
            <button
              onChange={() => {
                setBoardGames(1);
              }}
            >
              Juegos de mesa
            </button>

            <label htmlFor="board_games">Juegos de mesa</label>
            <input
              type="button"
              name="board_games"
              id="board_games"
              onChange={() => setBoardGames(1)}
              checked={boardGames}
            />
            <label htmlFor="cofee_n_chat">Café y charla</label>
            <input
              type="checkbox"
              name="cofee_n_chat"
              id="cofee_n_chat"
              onChange={() => setCoffeNChat(1)}
              checked={coffeNChat}
            />
            <label htmlFor="cooking_group">Grupo de cocina</label>
            <input
              type="checkbox"
              name="cooking_group"
              id="cooking_group"
              onChange={() => setCooking(1)}
              checked={cooking}
            />
            <label htmlFor="cycling_group">Grupo de ciclistas</label>
            <input
              type="checkbox"
              name="cycling_group"
              id="cycling_group"
              onChange={() => setCycling(1)}
              checked={cycling}
            />
            <label htmlFor="day_care_center">Centro de día</label>
            <input
              type="checkbox"
              name="day_care_center"
              id="day_care_center"
              onChange={() => setCareCenter(1)}
              checked={careCenter}
            />
            <label htmlFor="garden_group">Grupo de jardinería</label>
            <input
              type="checkbox"
              name="garden_group"
              id="garden_group"
              onChange={() => setGarden(1)}
              checked={garden}
            />
            <label htmlFor="home_assistance">Asistencia domiciliaria</label>
            <input
              type="checkbox"
              name="home_assistance"
              id="home_assistance"
              onChange={() => setHomeAssistance(1)}
              checked={homeAssistance}
            />
            <label htmlFor="phone_assistance">Asistencia telefónica</label>
            <input
              type="checkbox"
              name="phone_assistance"
              id="phone_assistance"
              onChange={() => setPhoneAssistance(1)}
              checked={phoneAssistance}
            />
            <label htmlFor="movie_club">Club de cine</label>
            <input
              type="checkbox"
              name="movie_club"
              id="movie_club"
              onChange={() => setMovie(1)}
              checked={movie}
            />
            <label htmlFor="reading_club">Club de lectura</label>
            <input
              type="checkbox"
              name="reading_club"
              id="reading_club"
              onChange={() => setReading(1)}
              checked={reading}
            />
            <label htmlFor="walking_club">Club de paseo</label>
            <input
              type="checkbox"
              name="walking_club"
              id="walking_club"
              onChange={() => setWalking(1)}
              checked={walking}
            />
            <button
              onClick={() => {
                createNewResource(id);
              }}
            >
              Crear recurso
            </button>
          </form> */
