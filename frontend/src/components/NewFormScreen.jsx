import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const NewFormScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    date: "",
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
    q8: "",
    q9: "",
    q10: "",
    values: {
      q1: 0,
      q2: 0,
      q3: 0,
      q4: 0,
      q5: 0,
      q6: 0,
      q7: 0,
      q8: 0,
      q9: 0,
      q10: 0,
    },
    sum: 0,
    observations: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "date" || name === "observations") {
      setForm({ ...form, [name]: value });
    } else {
      const updatedForm = { ...form, [name]: value };
      const sum = Object.keys(updatedForm)
        .filter((key) => key.startsWith("q")) // Filtrar solo las claves que comienzan con "q"
        .reduce(
          (accumulator, key) => accumulator + Number(updatedForm[key]),
          0
        );

      setForm({ ...updatedForm, sum });
    }
  };

  const createFormWithID = async (event) => {
    event.preventDefault();

    try {
      const infoUser = localStorage.getItem("infoUser");
      console.log("infoUser", infoUser);
      if (!infoUser) {
        navigate("/login");
        return;
      }
      const token = JSON.parse(infoUser).token;
      const response = await axios.post(
        `http://localhost:3100/api/lonelyForms/${id}/create`,
        form,
        {
          headers: { "x-access-token": token },
        }
      );
      console.log("DATOS DEl form creado: ", response);
      navigate(`/perfilSilver/${response.data.data.silver_id}`);
    } catch (error) {
      console.log("Da este error al coger la info de FORMS", error);
      if (error.response.status === 401 || error.response.status === 400) {
        navigate("/login");
      }
    }
  };

  return (
    <article>
      <h1>Creando formulario</h1>
      <form onSubmit={createFormWithID} className="newForm">
        <div className="date">
          <label htmlFor="date">Fecha</label>
          <input
            type="date"
            name="date"
            id="date"
            value={form.date}
            onChange={handleChange}
          />
        </div>
        <div className="question">
          <label htmlFor="q1">
            1: ¿Con qué frecuencia te sientes infeliz haciendo tantas cosas
            solo/a?
          </label>
          <input
            type="radio"
            name="q1"
            id="q1"
            value="1"
            onChange={handleChange}
            required
          />
          <label htmlFor="q1">Me siento así a menudo.</label>
          <input
            type="radio"
            name="q1"
            id="q2"
            value="2"
            onChange={handleChange}
          />
          <label htmlFor="q2">Me siento así con frecuencia.</label>
          <input
            type="radio"
            name="q1"
            id="q3"
            value="3"
            onChange={handleChange}
          />
          <label htmlFor="q3">Raramente me siento así.</label>
          <input
            type="radio"
            name="q1"
            id="q4"
            value="4"
            onChange={handleChange}
          />
          <label htmlFor="q4">Nunca me siento de ese modo.</label>
        </div>
        <div className="question">
          <label htmlFor="q2">
            2: ¿Con qué frecuencia sientes que no tienes a nadie con quien
            contar?
          </label>
          <input
            type="radio"
            name="q2"
            id="q5"
            value="1"
            onChange={handleChange}
            required
          />
          <label htmlFor="q5">Me siento así a menudo.</label>
          <input
            type="radio"
            name="q2"
            id="q6"
            value="2"
            onChange={handleChange}
          />
          <label htmlFor="q6">Me siento así con frecuencia.</label>
          <input
            type="radio"
            name="q2"
            id="q7"
            value="3"
            onChange={handleChange}
          />
          <label htmlFor="q7">Raramente me siento así.</label>
          <input
            type="radio"
            name="q2"
            id="q8"
            value="4"
            onChange={handleChange}
          />
          <label htmlFor="q8">Nunca me siento de ese modo.</label>
        </div>
        <div className="question">
          <label htmlFor="q3">
            3: ¿Con qué frecuencia sientes que no puedes tolerar estar solo/a?
          </label>
          <input
            type="radio"
            name="q3"
            id="q9"
            value="1"
            onChange={handleChange}
            required
          />
          <label htmlFor="q9">Me siento así a menudo.</label>
          <input
            type="radio"
            name="q3"
            id="q10"
            value="2"
            onChange={handleChange}
          />
          <label htmlFor="q10">Me siento así con frecuencia.</label>
          <input
            type="radio"
            name="q3"
            id="q11"
            value="3"
            onChange={handleChange}
          />
          <label htmlFor="q11">Raramente me siento así.</label>
          <input
            type="radio"
            name="q3"
            id="q12"
            value="4"
            onChange={handleChange}
          />
          <label htmlFor="q12">Nunca me siento de ese modo.</label>
        </div>
        <div className="question">
          <label htmlFor="q4">
            4: ¿Con qué frecuencia siente que nadie le entiende?
          </label>
          <input
            type="radio"
            name="q4"
            id="q13"
            value="1"
            onChange={handleChange}
            required
          />
          <label htmlFor="q13">Me siento así a menudo.</label>
          <input
            type="radio"
            name="q4"
            id="q14"
            value="2"
            onChange={handleChange}
          />
          <label htmlFor="q14">Me siento así con frecuencia.</label>
          <input
            type="radio"
            name="q4"
            id="q15"
            value="3"
            onChange={handleChange}
          />
          <label htmlFor="q15">Raramente me siento así.</label>
          <input
            type="radio"
            name="q4"
            id="q16"
            value="4"
            onChange={handleChange}
          />
          <label htmlFor="q16">Nunca me siento de ese modo.</label>
        </div>
        <div className="question">
          <label htmlFor="q5">
            5: ¿Con qué frecuencia se encuentra a sí mismo/a esperando que
            alguien le llame o le escriba?
          </label>
          <input
            type="radio"
            name="q5"
            id="q17"
            value="1"
            onChange={handleChange}
            required
          />
          <label htmlFor="q17">Me siento así a menudo.</label>
          <input
            type="radio"
            name="q5"
            id="q18"
            value="2"
            onChange={handleChange}
          />
          <label htmlFor="q18">Me siento así con frecuencia.</label>
          <input
            type="radio"
            name="q5"
            id="q19"
            value="3"
            onChange={handleChange}
          />
          <label htmlFor="q19">Raramente me siento así.</label>
          <input
            type="radio"
            name="q5"
            id="q20"
            value="4"
            onChange={handleChange}
          />
          <label htmlFor="q20">Nunca me siento de ese modo.</label>
        </div>
        <div className="question">
          <label htmlFor="q6">
            6: ¿Con qué frecuencia se siente completamente solo/a?
          </label>
          <input
            type="radio"
            name="q6"
            id="q21"
            value="1"
            onChange={handleChange}
            required
          />
          <label htmlFor="q21">Me siento así a menudo.</label>
          <input
            type="radio"
            name="q6"
            id="q22"
            value="2"
            onChange={handleChange}
          />
          <label htmlFor="q22">Me siento así con frecuencia.</label>
          <input
            type="radio"
            name="q6"
            id="q23"
            value="3"
            onChange={handleChange}
          />
          <label htmlFor="q23">Raramente me siento así.</label>
          <input
            type="radio"
            name="q6"
            id="q24"
            value="4"
            onChange={handleChange}
          />
          <label htmlFor="q24">Nunca me siento de ese modo.</label>
        </div>
        <div className="question">
          <label htmlFor="q7">
            7: ¿Con qué frecuencia se siente incapaz de llegar a los que le
            rodean y comunicarse con ellos?
          </label>
          <input
            type="radio"
            name="q7"
            id="q25"
            value="1"
            onChange={handleChange}
            required
          />
          <label htmlFor="q25">Me siento así a menudo.</label>
          <input
            type="radio"
            name="q7"
            id="q26"
            value="2"
            onChange={handleChange}
          />
          <label htmlFor="q26">Me siento así con frecuencia.</label>
          <input
            type="radio"
            name="q7"
            id="q27"
            value="3"
            onChange={handleChange}
          />
          <label htmlFor="q27">Raramente me siento así.</label>
          <input
            type="radio"
            name="q7"
            id="q28"
            value="4"
            onChange={handleChange}
          />
          <label htmlFor="q28">Nunca me siento de ese modo.</label>
        </div>
        <div className="question">
          <label htmlFor="q8">
            8: ¿Con qué frecuencia se siente hambriento de compañía?
          </label>
          <input
            type="radio"
            name="q8"
            id="q29"
            value="1"
            onChange={handleChange}
            required
          />
          <label htmlFor="q29">Me siento así a menudo.</label>
          <input
            type="radio"
            name="q8"
            id="q30"
            value="2"
            onChange={handleChange}
          />
          <label htmlFor="q30">Me siento así con frecuencia.</label>
          <input
            type="radio"
            name="q8"
            id="q31"
            value="3"
            onChange={handleChange}
          />
          <label htmlFor="q31">Raramente me siento así.</label>
          <input
            type="radio"
            name="q8"
            id="q32"
            value="4"
            onChange={handleChange}
          />
          <label htmlFor="q32">Nunca me siento de ese modo.</label>
        </div>
        <div className="question">
          <label htmlFor="q9">
            9: ¿Con qué frecuencia siente que es difícil para usted hacer
            amigo/as?
          </label>
          <input
            type="radio"
            name="q9"
            id="q33"
            value="1"
            onChange={handleChange}
            required
          />
          <label htmlFor="q33">Me siento así a menudo.</label>
          <input
            type="radio"
            name="q9"
            id="q34"
            value="2"
            onChange={handleChange}
          />
          <label htmlFor="q34">Me siento así con frecuencia.</label>
          <input
            type="radio"
            name="q9"
            id="q35"
            value="3"
            onChange={handleChange}
          />
          <label htmlFor="q35">Raramente me siento así.</label>
          <input
            type="radio"
            name="q9"
            id="q36"
            value="4"
            onChange={handleChange}
          />
          <label htmlFor="q36">Nunca me siento de ese modo.</label>
        </div>
        <div className="question">
          <label htmlFor="q10">
            10: ¿Con qué frecuencia se siente silenciado/a y excluido/a por las
            demás?
          </label>
          <input
            type="radio"
            name="q10"
            id="q37"
            value="1"
            onChange={handleChange}
            required
          />
          <label htmlFor="q37">Me siento así a menudo.</label>
          <input
            type="radio"
            name="q10"
            id="q38"
            value="2"
            onChange={handleChange}
          />
          <label htmlFor="q38">Me siento así con frecuencia.</label>
          <input
            type="radio"
            name="q10"
            id="q39"
            value="3"
            onChange={handleChange}
          />
          <label htmlFor="q39">Raramente me siento así.</label>
          <input
            type="radio"
            name="q10"
            id="q40"
            value="4"
            onChange={handleChange}
          />
          <label htmlFor="q40">Nunca me siento de ese modo.</label>
        </div>
        <div className="sum">
          <label htmlFor="sum">Suma:</label>
          {/* Aquí va un input que su valor se calcule en base a la suma de los valores de las preguntas anteriores */}
          <input
            type="text"
            name="sum"
            id="sum"
            value={form.sum}
            onChange={handleChange}
          />
        </div>
        .
        <div className="textarea">
          <label htmlFor="observations">Observaciones:</label>
          <textarea
            name="observations"
            id="observations"
            cols="30"
            rows="10"
            value={form.observations}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          GUARDAR
        </button>
      </form>
    </article>
  );
};

export default NewFormScreen;
