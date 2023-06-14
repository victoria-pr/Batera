import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import Axios from "axios";
import NavBar from "./NavBar";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const id = searchParams.get("id");
    if (token) {
      localStorage.setItem("infoUser", JSON.stringify({ token, id }));
      setSearchParams("");
      navigate("/");
    }
  });

  const getData = async (email, password) => {
    try {
      const response = await Axios.post(
        "https://api.batera.vickypr.es/api/auth/login",
        {
          email,
          password,
        }
      );
      goTo("/");
      console.log(response);
      localStorage.setItem("infoUser", JSON.stringify(response.data));
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data);
      }
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    getData(email, password);
  };

  const goTo = (url) => {
    navigate(url);
  };

  return (
    <section className="loginsection">
      <p>{errorMessage}</p>
      <div className="form-container">
        <NavBar />
        <div className="login-container">
          <h1 className="login-tittle">Inicia sesión</h1>
          <form action="" onSubmit={submit}>
            <div>
              <label htmlFor="email">ID usuario </label>
              <input
                className="loginInput"
                type="email"
                name="email"
                id="email"
              />
            </div>

            <div>
              <label htmlFor="password"> Contraseña </label>
              <input
                className="loginInput"
                type="password"
                name="password"
                id="password"
              />
            </div>

            <div className="btnslogin">
              <button className="btn-page">Entrar</button>
            </div>
          </form>

          <p className="text-sm">
            ¿No tienes cuenta?
            <Link to="/register"> Regístrate</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
