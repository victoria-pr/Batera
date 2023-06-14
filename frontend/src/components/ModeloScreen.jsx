import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RecursosScreen from "./RecursosScreen";

const ModeloScreen = ({ data }) => {
  const [modelo, setModelo] = useState();
  const [showLastResource, setShowLastResource] = useState(false);
  const navigate = useNavigate();
  const [lastRecurso, setLastRecurso] = useState({
    resource: {
      board_games: null,
      cofee_n_chat: null,
      cooking_group: null,
      cycling_group: null,
      day_care_center: null,
      garden_group: null,
      home_assistance: null,
      phone_assistance: null,
      movie_club: null,
      reading_club: null,
      walking_club: null,
    },
  });

  const infoUser = localStorage.getItem("infoUser");
  const localUser = JSON.parse(infoUser);
  console.log("Modeloorl", modelo);

  useEffect(() => {
    console.log("La data que tenemos aquí en el model", data);
  }, [data]);

  function calcularEdad(fechaNacimiento) {
    const fechaActual = new Date();
    const fechaNac = new Date(fechaNacimiento);

    let edad = fechaActual.getFullYear() - fechaNac.getFullYear();

    const mesActual = fechaActual.getMonth();
    const diaActual = fechaActual.getDate();
    const mesNacimiento = fechaNac.getMonth();
    const diaNacimiento = fechaNac.getDate();

    if (
      mesActual < mesNacimiento ||
      (mesActual === mesNacimiento && diaActual < diaNacimiento)
    ) {
      edad--; //resta un año si no se ha cumplido años
    }

    return edad;
  }
  const edad = calcularEdad(data.silver?.birthday);

  //imlementamos modelo predictivo
  const obtenerPrediccion = async () => {
    try {
      const url = `https://jonellacuria.pythonanywhere.com/v2/predict?Suma=${
        data.sum
      }&ID_Agente=${localUser.id}&Edad=${edad}&Sexo_Femenino=${
        data.silver?.gender === "Femenino" ? "1" : "0"
      }&Sexo_Masculino=${
        data.silver?.gender === "Masculino" ? "1" : "0"
      }&Municipio_Amorebieta_Etxano=${
        data.silver?.city === "Amorebieta-Etxano" ? "1" : "0"
      }&Municipio_Arratia=${
        data.silver?.city === "Arratia" ? "1" : "0"
      }&Municipio_Barakaldo=${
        data.silver?.city === "Barakaldo" ? "1" : "0"
      }&Municipio_Basauri_Etxebarri=${
        data.silver?.city === "Basauri/Etxebarri" ? "1" : "0"
      }&Municipio_Bermeo=${
        data.silver?.city === "Bermeo" ? "1" : "0"
      }&Municipio_Bilbao=${
        data.silver.city === "Bilbao" ? "1" : "0"
      }&Municipio_Busturialdea=${
        data.silver?.city === "Busturialdea" ? "1" : "0"
      }&Municipio_Durango=${
        data.silver?.city === "Durango" ? "1" : "0"
      }&Municipio_Erandio=${
        data.silver?.city === "Erandio" ? "1" : "0"
      }&Municipio_Ermua_Mallabia=${
        data.silver?.city === "Ermua/Mallabia" ? "1" : "0"
      }&Municipio_Galdakao=${
        data.silver?.city === "Galdakao" ? "1" : "0"
      }&Municipio_Getxo=${
        data.silver?.city === "Getxo" ? "1" : "0"
      }&Municipio_Goi_Enkarterri=${
        data.silver?.city === "Goi Enkarterri" ? "1" : "0"
      }&Municipio_Lea_Artibai=${
        data.silver?.city === "Lea Artibai" ? "1" : "0"
      }&Municipio_Leioa=${
        data.silver?.city === "Leioa" ? "1" : "0"
      }&Municipio_Meatzaldea=${
        data.silver?.city === "Meatzaldea" ? "1" : "0"
      }&Municipio_Mungialde=${
        data.silver?.city === "Mungialde" ? "1" : "0"
      }&Municipio_Nerbioi=${
        data.silver?.city === "Nerbioi" ? "1" : "0"
      }&Municipio_Portugalete=${
        data.silver?.city === "Portugalete" ? "1" : "0"
      }&Municipio_Santurtzi=${
        data.silver?.city === "Santurtzi" ? "1" : "0"
      }&Municipio_Sestao=${
        data.silver?.city === "Sestao" ? "1" : "0"
      }&Municipio_Trasladados=${
        data.silver?.city === "Trasladados" ? "1" : "0"
      }&Municipio_Txorierri=${
        data.silver?.city === "Txorierri" ? "1" : "0"
      }&Municipio_Uribe_Kosta=${
        data.silver?.city === "Uribe Kosta" ? "1" : "0"
      }&Estado_Civil_Casado=${
        data.silver?.marital_status === "Casado/a" ? "1" : "0"
      }&Estado_Civil_Divorciado=${
        data.silver?.marital_status === "Divorciado/a" ? "1" : "0"
      }&Estado_Civil_Soltero=${
        data.silver?.marital_status === "Soltero/a" ? "1" : "0"
      }&Estado_Civil_Viudo= ${
        data.silver?.marital_status === "Viudo/a" ? "1" : "0"
      }`;
      console.log("la url de api: ", url);
      const response = await fetch(url);
      const modelo = await response.json();
      console.log("la respuesta de api: ", response);
      setModelo(modelo);
    } catch (error) {
      console.log("Da este error al hacer el modelo", error);
      if (error.response.status === 401 || error.response.status === 400) {
        console.log("error 401 el if del catch");
      }
    }
  };

  //retrain modelo predictivo
  const retrainModelo = async () => {
    try {
      //espera a que esté lastRecurso
      const lastRecursoResources = [];
      if (lastRecurso.resource.board_games === "1") {
        lastRecursoResources.push("Juegos de mesa");
      }
      if (lastRecurso.resource.cofee_n_chat === "1") {
        lastRecursoResources.push("Café y charlas");
      }
      if (lastRecurso.resource.cooking_group === "1") {
        lastRecursoResources.push("Grupo de cocina");
      }
      if (lastRecurso.resource.cycling_group === "1") {
        lastRecursoResources.push("Grupo de ciclistas");
      }
      if (lastRecurso.resource.day_care_center === "1") {
        lastRecursoResources.push("Centro de día");
      }
      if (lastRecurso.resource.garden_group === "1") {
        lastRecursoResources.push("Grupo de jardinería");
      }
      if (lastRecurso.resource.home_assistance === "1") {
        lastRecursoResources.push("Asistencia domiciliaria");
      }
      if (lastRecurso.resource.phone_assistance === "1") {
        lastRecursoResources.push("Asistencia telefónica");
      }
      if (lastRecurso.resource.movie_club === "1") {
        lastRecursoResources.push("Club de cine");
      }
      if (lastRecurso.resource.reading_club === "1") {
        lastRecursoResources.push("Club de lectura");
      }
      if (lastRecurso.resource.walking_club === "1") {
        lastRecursoResources.push("Grupo de caminar");
      }
      // Agrega más condicionales según sea necesario para las demás propiedades
      console.log("A VER QUE ME DA", lastRecurso.resource.board_games);
      const recursos_ut = lastRecursoResources.join(",");
      console.log("ESTO ES LASTRECURSO", lastRecursoResources);

      const url = `https://jonellacuria.pythonanywhere.com/v2/retrain?Suma=${
        data.sum
      }&ID_Agente=${localUser.id}&Edad=${edad}&Sexo_Femenino=${
        data.silver?.gender === "Femenino" ? "1" : "0"
      }&Sexo_Masculino=${
        data.silver?.gender === "Masculino" ? "1" : "0"
      }&Municipio_Amorebieta_Etxano=${
        data.silver?.city === "Amorebieta-Etxano" ? "1" : "0"
      }&Municipio_Arratia=${
        data.silver?.city === "Arratia" ? "1" : "0"
      }&Municipio_Barakaldo=${
        data.silver?.city === "Barakaldo" ? "1" : "0"
      }&Municipio_Basauri_Etxebarri=${
        data.silver?.city === "Basauri/Etxebarri" ? "1" : "0"
      }&Municipio_Bermeo=${
        data.silver?.city === "Bermeo" ? "1" : "0"
      }&Municipio_Bilbao=${
        data.silver.city === "Bilbao" ? "1" : "0"
      }&Municipio_Busturialdea=${
        data.silver?.city === "Busturialdea" ? "1" : "0"
      }&Municipio_Durango=${
        data.silver?.city === "Durango" ? "1" : "0"
      }&Municipio_Erandio=${
        data.silver?.city === "Erandio" ? "1" : "0"
      }&Municipio_Ermua_Mallabia=${
        data.silver?.city === "Ermua/Mallabia" ? "1" : "0"
      }&Municipio_Galdakao=${
        data.silver?.city === "Galdakao" ? "1" : "0"
      }&Municipio_Getxo=${
        data.silver?.city === "Getxo" ? "1" : "0"
      }&Municipio_Goi_Enkarterri=${
        data.silver?.city === "Goi Enkarterri" ? "1" : "0"
      }&Municipio_Lea_Artibai=${
        data.silver?.city === "Lea Artibai" ? "1" : "0"
      }&Municipio_Leioa=${
        data.silver?.city === "Leioa" ? "1" : "0"
      }&Municipio_Meatzaldea=${
        data.silver?.city === "Meatzaldea" ? "1" : "0"
      }&Municipio_Mungialde=${
        data.silver?.city === "Mungialde" ? "1" : "0"
      }&Municipio_Nerbioi=${
        data.silver?.city === "Nerbioi" ? "1" : "0"
      }&Municipio_Portugalete=${
        data.silver?.city === "Portugalete" ? "1" : "0"
      }&Municipio_Santurtzi=${
        data.silver?.city === "Santurtzi" ? "1" : "0"
      }&Municipio_Sestao=${
        data.silver?.city === "Sestao" ? "1" : "0"
      }&Municipio_Trasladados=${
        data.silver?.city === "Trasladados" ? "1" : "0"
      }&Municipio_Txorierri=${
        data.silver?.city === "Txorierri" ? "1" : "0"
      }&Municipio_Uribe_Kosta=${
        data.silver?.city === "Uribe Kosta" ? "1" : "0"
      }&Estado_Civil_Casado=${
        data.silver?.marital_status === "Casado/a" ? "1" : "0"
      }&Estado_Civil_Divorciado=${
        data.silver?.marital_status === "Divorciado/a" ? "1" : "0"
      }&Estado_Civil_Soltero=${
        data.silver?.marital_status === "Soltero/a" ? "1" : "0"
      }&Estado_Civil_Viudo=${
        data.silver?.marital_status === "Viudo/a" ? "1" : "0"
      }&recursos_ut=${recursos_ut}&Suma_ant=${
        data.silver.loneliness_forms.slice(-2)[0].sum
      }`; //Tener en cuenta esta ruta
      console.log("la url que pasamos para reentrenar: ", url);
      const response = await axios.put(url); //probar con put
      console.log("la respuesta de reentrenar: ", response);
    } catch (error) {
      console.log("Da este error al reentrenar", error);
      if (error.response.status === 401 || error.response.status === 400) {
        console.log("error 401 el if del catch");
      }
    }
  };

  const obtenerUltimoRecurso = async () => {
    if (data.silver.loneliness_forms.length > 0) {
      const lastForm =
        data.silver.loneliness_forms[data.silver.loneliness_forms.length - 2];
      if (lastForm.resource === null) {
        const previousForm =
          data.silver.loneliness_forms[data.silver.loneliness_forms.length - 3];
        setLastRecurso(previousForm);
        setShowLastResource(true);
      } else {
        setLastRecurso(lastForm);
        setShowLastResource(true);
      }
    }
  };

  useEffect(() => {
    obtenerUltimoRecurso();
  }, [data]);

  return (
    <article className="modeloscreen">
      <div className="info-container">
        <div className="prediction-container">
          {!modelo ? (
            <button
              className="predict-button"
              onClick={() => {
                obtenerPrediccion();
                retrainModelo();
                console.log("el ultimo recurso: ", lastRecurso);
              }}
            >
              Obtener recomendación
            </button>
          ) : (
            <div className="prediction">
              <button
                className="close-prediction"
                onClick={() => {
                  setModelo(null);
                }}
              >
                Cerrar recomendación
              </button>
              {modelo?.actividad_1 ? <p>{modelo.actividad_1}</p> : null}
              {modelo?.actividad_2 ? <p>{modelo.actividad_2}</p> : null}
              {modelo?.actividad_3 ? <p>{modelo.actividad_3}</p> : null}
              {modelo?.actividad_4 ? <p>{modelo.actividad_4}</p> : null}
              {modelo?.actividad_5 ? <p>{modelo.actividad_5}</p> : null}
              {modelo?.actividad_6 ? <p>{modelo.actividad_6}</p> : null}
              {modelo?.actividad_7 ? <p>{modelo.actividad_7}</p> : null}
              {modelo?.actividad_8 ? <p>{modelo.actividad_8}</p> : null}
              {modelo?.actividad_9 ? <p>{modelo.actividad_9}</p> : null}
              {modelo?.actividad_10 ? <p>{modelo.actividad_10}</p> : null}
              {modelo?.actividad_11 ? <p>{modelo.actividad_11}</p> : null}
            </div>
          )}
        </div>

        {!lastRecurso ? (
          <p>No hay recursos anteriores</p>
        ) : (
          //Aqui va el boton de ver el ultimo recurso
          <div className="last-resource">
            {!showLastResource ? (
              <button
                className="last-resource-button"
                onClick={() => {
                  setShowLastResource(!showLastResource);
                }}
              >
                Ver último recurso adjudicado
              </button>
            ) : (
              ""
            )}

            {showLastResource ? (
              <div className="last-resource-list">
                <button
                  className="close-last-resource"
                  onClick={() => {
                    setShowLastResource(!showLastResource);
                  }}
                >
                  Cerrar último recurso adjudicado
                </button>
                {lastRecurso.resource?.board_games === 1 ? (
                  <p>Juegos de mesa</p>
                ) : null}
                {lastRecurso.resource?.cofee_n_chat === 1 ? (
                  <p>Café y charlas</p>
                ) : null}
                {lastRecurso.resource?.cooking_group === 1 ? (
                  <p>Grupo de cocina</p>
                ) : null}
                {lastRecurso.resource?.cycling_group === 1 ? (
                  <p>Grupo de ciclismo</p>
                ) : null}
                {lastRecurso.resource?.day_care_center === 1 ? (
                  <p>Centro de día</p>
                ) : null}
                {lastRecurso.resource?.garden_group === 1 ? (
                  <p>Grupo de jardinería</p>
                ) : null}
                {lastRecurso.resource?.home_assistance === 1 ? (
                  <p>Asistencia domiciliaria</p>
                ) : null}
                {lastRecurso.resource?.movie_club === 1 ? (
                  <p>Club de cine</p>
                ) : null}
                {lastRecurso.resource?.phone_assistance === 1 ? (
                  <p>Asistencia telefónica</p>
                ) : null}
                {lastRecurso.resource?.reading_club === 1 ? (
                  <p>Club de lectura</p>
                ) : null}
                {lastRecurso.resource?.walking_club === 1 ? (
                  <p>Grupo de caminar</p>
                ) : null}
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default ModeloScreen;
