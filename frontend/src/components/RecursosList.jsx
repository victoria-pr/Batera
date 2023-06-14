import React, { useEffect, useState } from "react";
import NavBarIcons from "./NavBarIcons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RecursosList() {
  const navigate = useNavigate();
  //estado por cada recursos para mostrar la tarjeta de municipios
  const [asistenciaDomiciliaria, setAsistenciaDomiciliaria] = useState([]);
  const [asistenciaTelefonica, setAsistenciaTelefonica] = useState(false);
  const [cafeYCharlas, setCafeYCharlas] = useState(false);
  const [centroDia, setCentroDia] = useState(false);
  const [clubCine, setClubCine] = useState(false);
  const [clubLectura, setClubLectura] = useState(false);
  const [juegosMesa, setJuegosMesa] = useState(false);
  const [caminar, setCaminar] = useState(false);
  const [ciclismo, setCiclismo] = useState(false);
  const [cocina, setCocina] = useState(false);
  const [jardinería, setJardinería] = useState(false);

  return (
    <article className="resourceList-article">
      <NavBarIcons />
      <section className="resourceList-section">
        <div className="resourceList-section__container">
          <h2>Recursos</h2>
          <div className="resourceList-section__container--data">
            {!asistenciaDomiciliaria ? (
              <div
                className="resourceList-section__container--data__item no-active"
                onClick={() => setAsistenciaDomiciliaria(true)}
              >
                <h3>Asistencia domiciliaria</h3>
              </div>
            ) : (
              <div
                className="resourceList-section__container--data__item"
                onClick={() => setAsistenciaDomiciliaria(false)}
              >
                <h3>Asistencia domiciliaria</h3>
                <h4>Municipios:</h4>
                <p>Amorebieta-Etxano</p>
                <p>Arratia</p>
                <p>Barakaldo</p>
                <p>Basauri/Etxebarri</p>
                <p>Bermeo</p>
                <p>Bilbao</p>
                <p>Busturialdea</p>
                <p>Durango</p>
                <p>Erandio</p>
                <p>Ermua/Malabia</p>
                <p>Galdakao</p>
                <p>Getxo</p>
                <p>Goi Enkarterri</p>
                <p>Lea Artibai</p>
                <p>Leioa</p>
                <p>Meatzaldea</p>
                <p>Mungialde</p>
                <p>Nerbioi</p>
                <p>Portugalete</p>
                <p>Santurtzi</p>
                <p>Sestao</p>
                {/* <p>Trasladados</p> */}
                <p>Txorierri</p>
                <p>Uribe Kosta</p>
              </div>
            )}

            <div className="resourceList-section__container--data__item">
              <h3>Asistencia telefónica</h3>
              <h4>Municipios:</h4>
              <p>Amorebieta-Etxano</p>
              <p>Arratia</p>
              <p>Barakaldo</p>
              <p>Basauri/Etxebarri</p>
              <p>Bermeo</p>
              <p>Bilbao</p>
              <p>Busturialdea</p>
              <p>Durango</p>
              <p>Erandio</p>
              <p>Ermua/Malabia</p>
              <p>Galdakao</p>
              <p>Getxo</p>
              <p>Goi Enkarterri</p>
              <p>Lea Artibai</p>
              <p>Leioa</p>
              <p>Meatzaldea</p>
              <p>Mungialde</p>
              <p>Nerbioi</p>
              <p>Portugalete</p>
              <p>Santurtzi</p>
              <p>Sestao</p>
              {/* <p>Trasladados</p> */}
              <p>Txorierri</p>
              <p>Uribe Kosta</p>
            </div>

            <div className="resourceList-section__container--data__item">
              <h3>Café y Charlas</h3>
              <h4>Municipios:</h4>
              <p>Amorebieta-Etxano</p>
              {/*               <p>Arratia</p>
               */}
              <p>Barakaldo</p>
              {/* <p>Basauri/Etxebarri</p>
              <p>Bermeo</p> */}
              <p>Bilbao</p>
              <p>Busturialdea</p>
              <p>Durango</p>
              {/*               <p>Erandio</p>
               */}
              <p>Ermua/Malabia</p>
              <p>Galdakao</p>
              <p>Getxo</p>
              {/* <p>Goi Enkarterri</p>
              <p>Lea Artibai</p> */}
              <p>Leioa</p>
              {/*               <p>Meatzaldea</p>
               */}
              <p>Mungialde</p>
              {/*               <p>Nerbioi</p>
               */}
              <p>Portugalete</p>
              <p>Santurtzi</p>
              <p>Sestao</p>
              {/* <p>Trasladados</p> 
              <p>Txorierri</p> */}
              <p>Uribe Kosta</p>
            </div>

            <div className="resourceList-section__container--data__item">
              <h3>Centro de día</h3>
              <h4>Municipios:</h4>
              <p>Amorebieta-Etxano</p>
              {/*               <p>Arratia</p>
               */}
              <p>Barakaldo</p>
              <p>Basauri/Etxebarri</p>
              <p>Bermeo</p>
              <p>Bilbao</p>
              <p>Busturialdea</p>
              <p>Durango</p>
              <p>Erandio</p>
              <p>Ermua/Malabia</p>
              <p>Galdakao</p>
              <p>Getxo</p>
              {/*               <p>Goi Enkarterri</p>
               */}
              <p>Lea Artibai</p>
              <p>Leioa</p>
              {/*               <p>Meatzaldea</p>
               */}
              <p>Mungialde</p>
              <p>Nerbioi</p>
              <p>Portugalete</p>
              <p>Santurtzi</p>
              <p>Sestao</p>
              {/* <p>Trasladados</p> 
              <p>Txorierri</p>*/}
              <p>Uribe Kosta</p>
            </div>

            <div className="resourceList-section__container--data__item">
              <h3>Club de Cine</h3>
              <h4>Municipios:</h4>
              {/* <p>Amorebieta-Etxano</p>
              <p>Arratia</p> */}
              <p>Barakaldo</p>
              <p>Basauri/Etxebarri</p>
              {/*               <p>Bermeo</p>
               */}
              <p>Bilbao</p>
              {/*  <p>Busturialdea</p>
              <p>Durango</p> 
              <p>Erandio</p>*/}
              <p>Ermua/Malabia</p>
              {/*               <p>Galdakao</p>
               */}
              <p>Getxo</p>
              {/* <p>Goi Enkarterri</p>
              <p>Lea Artibai</p> */}
              <p>Leioa</p>
              {/*  <p>Meatzaldea</p>
              <p>Mungialde</p>
              <p>Nerbioi</p>
              <p>Portugalete</p>
              <p>Santurtzi</p> */}
              <p>Sestao</p>
              {/* <p>Trasladados</p> 
              <p>Txorierri</p>
              <p>Uribe Kosta</p>*/}
            </div>

            <div className="resourceList-section__container--data__item">
              <h3>Club de lectura</h3>
              <h4>Municipios:</h4>
              {/* <p>Amorebieta-Etxano</p>
              <p>Arratia</p> */}
              <p>Barakaldo</p>
              <p>Basauri/Etxebarri</p>
              {/*               <p>Bermeo</p>
               */}
              <p>Bilbao</p>
              {/*               <p>Busturialdea</p>
               */}
              <p>Durango</p>
              <p>Erandio</p>
              {/*               <p>Ermua/Malabia</p>
               */}
              <p>Galdakao</p>
              <p>Getxo</p>
              {/*  <p>Goi Enkarterri</p>
              <p>Lea Artibai</p> */}
              <p>Leioa</p>
              {/* <p>Meatzaldea</p>
              <p>Mungialde</p>
              <p>Nerbioi</p> */}
              <p>Portugalete</p>
              {/*               <p>Santurtzi</p>
               */}
              <p>Sestao</p>
              {/* <p>Trasladados</p> 
              <p>Txorierri</p>
              <p>Uribe Kosta</p>*/}
            </div>

            <div className="resourceList-section__container--data__item">
              <h3>Juegos de mesa</h3>
              <h4>Municipios:</h4>
              {/*               <p>Amorebieta-Etxano</p>
               */}
              <p>Arratia</p>
              <p>Barakaldo</p>
              <p>Basauri/Etxebarri</p>
              {/*               <p>Bermeo</p>
               */}
              <p>Bilbao</p>
              <p>Busturialdea</p>
              {/*               <p>Durango</p>
               */}
              <p>Erandio</p>
              <p>Ermua/Malabia</p>
              {/*               <p>Galdakao</p>
               */}
              <p>Getxo</p>
              {/*  <p>Goi Enkarterri</p>
              <p>Lea Artibai</p>
              <p>Leioa</p>
              <p>Meatzaldea</p>
              <p>Mungialde</p>
              <p>Nerbioi</p>
              <p>Portugalete</p> */}
              <p>Santurtzi</p>
              {/* <p>Sestao</p>
              <p>Trasladados</p> 
              <p>Txorierri</p>
              <p>Uribe Kosta</p>*/}
            </div>

            <div className="resourceList-section__container--data__item">
              <h3>Grupo de caminar</h3>
              <h4>Municipios:</h4>
              <p>Amorebieta-Etxano</p>
              <p>Arratia</p>
              {/*  <p>Barakaldo</p>
              <p>Basauri/Etxebarri</p> */}
              <p>Bermeo</p>
              <p>Bilbao</p>
              <p>Busturialdea</p>
              <p>Durango</p>
              {/* <p>Erandio</p>
              <p>Ermua/Malabia</p> */}
              <p>Galdakao</p>
              <p>Getxo</p>
              {/*               <p>Goi Enkarterri</p>
               */}
              <p>Lea Artibai</p>
              <p>Leioa</p>
              {/*               <p>Meatzaldea</p>
               */}
              <p>Mungialde</p>
              <p>Nerbioi</p>
              {/* <p>Portugalete</p>
              <p>Santurtzi</p>
              <p>Sestao</p>
              <p>Trasladados</p> 
              <p>Txorierri</p>
              <p>Uribe Kosta</p>*/}
            </div>

            <div className="resourceList-section__container--data__item">
              <h3>Grupo de ciclismo</h3>
              <h4>Municipios:</h4>
              <p>Amorebieta-Etxano</p>
              {/*               <p>Arratia</p>
               */}
              <p>Barakaldo</p>
              <p>Basauri/Etxebarri</p>
              {/*               <p>Bermeo</p>
               */}
              <p>Bilbao</p>
              <p>Busturialdea</p>
              <p>Durango</p>
              {/*               <p>Erandio</p>
               */}
              <p>Ermua/Malabia</p>
              <p>Galdakao</p>
              <p>Getxo</p>
              <p>Goi Enkarterri</p>
              <p>Lea Artibai</p>
              {/* <p>Leioa</p>
              <p>Meatzaldea</p>
              <p>Mungialde</p> */}
              <p>Nerbioi</p>
              <p>Portugalete</p>
              {/*  <p>Santurtzi</p>
              <p>Sestao</p>
              <p>Trasladados</p> */}
              <p>Txorierri</p>
              <p>Uribe Kosta</p>
            </div>

            <div className="resourceList-section__container--data__item">
              <h3>Grupo de cocina</h3>
              <h4>Municipios:</h4>
              <p>Amorebieta-Etxano</p>
              <p>Arratia</p>
              <p>Barakaldo</p>
              <p>Basauri/Etxebarri</p>
              <p>Bermeo</p>
              <p>Bilbao</p>
              <p>Busturialdea</p>
              <p>Durango</p>
              {/*               <p>Erandio</p>
               */}
              <p>Ermua/Malabia</p>
              {/*               <p>Galdakao</p>
               */}
              <p>Getxo</p>
              {/*               <p>Goi Enkarterri</p>
               */}
              <p>Lea Artibai</p>
              {/*  <p>Leioa</p>
              <p>Meatzaldea</p> */}
              <p>Mungialde</p>
              {/*     <p>Nerbioi</p>
              <p>Portugalete</p>
              <p>Santurtzi</p> */}
              <p>Sestao</p>
              {/* <p>Trasladados</p> 
              <p>Txorierri</p>*/}
              <p>Uribe Kosta</p>
            </div>

            <div className="resourceList-section__container--data__item">
              <h3>Grupo de jardinería</h3>
              <h4>Municipios:</h4>
              <p>Amorebieta-Etxano</p>
              <p>Arratia</p>
              {/* <p>Barakaldo</p>
              <p>Basauri/Etxebarri</p> */}
              <p>Bermeo</p>
              {/*   <p>Bilbao</p>
              <p>Busturialdea</p>
              <p>Durango</p>
              <p>Erandio</p>
              <p>Ermua/Malabia</p>
              <p>Galdakao</p> */}
              <p>Getxo</p>
              {/*               <p>Goi Enkarterri</p>
               */}
              <p>Lea Artibai</p>
              {/*  <p>Leioa</p>
              <p>Meatzaldea</p>
              <p>Mungialde</p> */}
              <p>Nerbioi</p>
              {/*               <p>Portugalete</p>
               */}
              <p>Santurtzi</p>
              {/*  <p>Sestao</p>
             <p>Trasladados</p> */}
              <p>Txorierri</p>
              {/*               <p>Uribe Kosta</p>
               */}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

export default RecursosList;
