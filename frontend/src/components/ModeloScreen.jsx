import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RecursosScreen from "./RecursosScreen";

const ModeloScreen = ({ data }) => {
  const infoUser = localStorage.getItem("infoUser");
  const localUser = JSON.parse(infoUser);
  const [modelo, setModelo] = useState();
  console.log("Modeloorl", modelo);

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

  return (
    <div>
      ModeloScreen
      <div className="prediction-container">
        <h2>Predicción:</h2>
        <button
          className="predict-button"
          onClick={() => {
            obtenerPrediccion();
          }}
        >
          Obtener recomendación
        </button>

        <div className="prediction">
          Recomendaciones:
          <p>{modelo?.actividad_1 ? modelo.actividad_1 : ""}</p>
          <p>{modelo?.actividad_2 ? modelo.actividad_2 : ""}</p>
          <p>{modelo?.actividad_3 ? modelo.actividad_3 : ""}</p>
          <p>{modelo?.actividad_4 ? modelo.actividad_4 : ""}</p>
          <p>{modelo?.actividad_5 ? modelo.actividad_5 : ""}</p>
          <p>{modelo?.actividad_6 ? modelo.actividad_6 : ""}</p>
          <p>{modelo?.actividad_7 ? modelo.actividad_7 : ""}</p>
          <p>{modelo?.actividad_8 ? modelo.actividad_8 : ""}</p>
          <p>{modelo?.actividad_9 ? modelo.actividad_9 : ""}</p>
          <p>{modelo?.actividad_10 ? modelo.actividad_10 : ""}</p>
          <p>{modelo?.actividad_11 ? modelo.actividad_11 : ""}</p>
          {/*           <p>{modelo.actividad_1 ? modelo.actividad_1 : ""}</p>
           */}{" "}
          {/*           <h3>Modelo: {modelo}</h3>
           */}{" "}
        </div>
      </div>
    </div>
  );
};

export default ModeloScreen;
