import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Axios from "axios";

const Register = () => {
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [requestError, setRequestError] = useState("");
  const navigate = useNavigate();

  const getData = async (email, password) => {
    try {
      const response = await Axios.post(
        "http://localhost:3100/api/agents/register",
        {
          email,
          password,
        }
      );
      setRequestError("");
      goTo("/login");
    } catch (error) {
      if (error.response) {
        setRequestError(error.response.data);
      }
    }
  };

  useEffect(() => {
    /* getData(); */
  }, []);

  const submit = (e) => {
    let error = false;
    e.preventDefault();
    setErrorEmail("");
    setErrorPassword("");
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (!confirmPassword(password)) {
      error = true;
      setErrorPassword(
        "La contraseña debe contener al menos una letra mayúscula, un número y tener una longitud mínima de 6 caracteres"
      );
    }
    if (!confirmEmail(email)) {
      error = true;
      setErrorEmail("Por favor, introduce un correo electrónico válido");
    }
    if (error) return;
    getData(email, password);
  };

  const confirmPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
  };

  const confirmEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const goTo = (url) => {
    navigate(url);
  };

  return (
    <section className="signupsection">
      <div className="form-container">
        <h1 className="maintitulo">Regístrate</h1>
        <form action="" onSubmit={submit}>
          <div>
            <label htmlFor="email">Dirección de correo {errorEmail}</label>
            <input
              type="email"
              name="email"
              id="email"
              className="loginInput"
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña {errorPassword}</label>
            <input
              type="password"
              name="password"
              id="password"
              className="loginInput"
            />
          </div>
          <div className="btns">
            <button className="btn-page" type="submit">
              Registrarse
            </button>
          </div>
        </form>
        <p className="text-sm">
          ¿Ya tienes cuenta?
          <Link to="/login"> Inicia sesión</Link>
        </p>
      </div>
      <p>{requestError}</p>
    </section>
  );
};

export default Register;
