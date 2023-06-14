import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RecursosScreen from "./RecursosScreen";
import NavBarIcons from "./NavBarIcons";
const FormularioScreen = () => {
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

  const handleDelete = async (formId) => {
    try {
      const infoUser = localStorage.getItem("infoUser");
      console.log("infoUser", infoUser);
      if (!infoUser) {
        navigate("/login");
        return;
      }
      const token = JSON.parse(infoUser).token;
      const response = await axios.delete(
        `http://localhost:3100/api/lonelyForms/${formId}/delete`,
        {
          headers: { "x-access-token": token },
        }
      );
      console.log("DATOS DE LOS formularios al borrar form: ", response);
      //ahora navegamos a la pantalla de perfil silver
      navigate(`/perfilSilver/${data.silver.silver_id}`);
    } catch (error) {
      console.log("Da este error al coger la info de FORMS", error);
      if (error.response.status === 401 || error.response.status === 400) {
        navigate("/login");
      }
    }
  };

  const deleteForm = (formId) => {
    handleDelete(formId);
  };

  //función para condicionar la respuesta de las preguntas
  const getAnswer = (answer) => {
    if (answer === 1) {
      return "Nunca me siento de ese modo.";
    } else if (answer === 2) {
      return "Raramente me siento así";
    } else if (answer === 3) {
      return "Me siento así con frecuencia.";
    } else if (answer === 4) {
      return "Me siento así siempre.";
    }
  };

  if (!data) return <div>Loading...</div>;
  return (
    <section className="form-section">
      <NavBarIcons />
      <div className="form-container">
        <div className="form-card">
          <div className="form-info">
            <div className="form-header">
              <div className="info-header">
                <h1>
                  Nº Evaluación: <span>{data.lon_form_id}</span>
                </h1>
                <p>
                  Fecha: <span>{data.date}</span>
                </p>
              </div>
              <button
                className="btn-cancelar"
                onClick={() => {
                  navigate(`/perfilSilver/${data.silver.silver_id}`);
                }}
              >
                X
              </button>
            </div>
            <article className="form-body">
              <h2>Resultado del formulario</h2>
              <div className="question-container">
                <h4>
                  1: ¿Con qué frecuencia te sientes infeliz haciendo tantas
                  cosas solo/a?
                </h4>
                <p>-{getAnswer(data.q1)}</p>
              </div>

              <div className="question-container">
                <h4>
                  2: ¿Con qué frecuencia sientes que no tienes a nadie con quien
                  contar?
                </h4>
                <p>-{getAnswer(data.q2)}</p>
              </div>

              <div className="question-container">
                <h4>
                  3: ¿Con qué frecuencia sientes que no puedes tolerar estar
                  solo/a?
                </h4>
                <p>-{getAnswer(data.q3)}</p>
              </div>

              <div className="question-container">
                <h4>4: ¿Con qué frecuencia siente que nadie le entiende?</h4>
                <p>-{getAnswer(data.q4)}</p>
              </div>

              <div className="question-container">
                <h4>
                  5: ¿Con qué frecuencia se encuentra a sí mismo/a esperando que
                  alguien le llame o le escriba?
                </h4>
                <p>-{getAnswer(data.q5)}</p>
              </div>

              <div className="question-container">
                <h4>6: ¿Con qué frecuencia se siente completamente solo/a?</h4>
                <p>-{getAnswer(data.q6)}</p>
              </div>

              <div className="question-container">
                <h4>
                  7: ¿Con qué frecuencia se siente incapaz de llegar a los que
                  le rodean y comunicarse con ellos?
                </h4>
                <p>-{getAnswer(data.q7)}</p>
              </div>

              <div className="question-container">
                <h4>
                  8: ¿Con qué frecuencia se siente hambriento de compañía?
                </h4>
                <p>-{getAnswer(data.q8)}</p>
              </div>

              <div className="question-container">
                <h4>
                  9: ¿Con qué frecuencia siente que es difícil para usted hacer
                  amigo/as?
                </h4>
                <p>-{getAnswer(data.q9)}</p>
              </div>
              <div className="question-container">
                <h4>
                  10: ¿Con qué frecuencia se siente silenciado/a y excluido/a
                  por las demás?
                </h4>
                <p>-{getAnswer(data.q10)}</p>
              </div>

              <h3
                className={
                  data.sum <= 24
                    ? "green"
                    : data.sum > 24 && data.sum <= 31
                    ? "yellow"
                    : "red"
                }
              >
                Índice de soledad: <span>{data.sum}/40</span>
              </h3>
              <div className="textarea">
                {data.observations?.length > 0 ? (
                  <>
                    <p>Observaciones:</p>
                    <textarea
                      cols="30"
                      rows="10"
                      disabled
                      value={data.observations}
                    ></textarea>
                  </>
                ) : (
                  <span></span>
                )}
              </div>
            </article>
            <div className="red-line"></div>
            {data && <RecursosScreen data={data} setData={setData} />}
          </div>
          <button
            className="btn-descargar"
            onClick={() => {
              window.print();
            }}
          >
            DESCARGAR
          </button>{" "}
        </div>

        <button
          className="btn btn-danger"
          onClick={() => {
            deleteForm(data.lon_form_id);
          }}
        >
          borrar
        </button>
      </div>
    </section>
  );
};

export default FormularioScreen;
