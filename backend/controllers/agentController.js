import Agent from "../models/agents.js";
import bcrypt from "bcrypt";

const getAll = async (req, res) => {
  try {
    let agents = await Agent.findAll({
      attributes: [
        "agent_id",
        "email",
        "password",
        "name",
        "surname",
        "telephone",
      ],
    });
    res.send(agents);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving agents.",
    });
  }
};

const getById = async (req, res) => {
  try {
    /* const iduser = req.user.id; */
    const agent_id = req.params.id;
    let agent = await Agent.findByPk(agent_id, {
      attributes: [
        "agent_id",
        "email",
        "password",
        "name",
        "surname",
        "telephone",
      ],
    });
    res.send(agent);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving agents.",
    });
  }
};

const create = async (req, res) => {
  try {
    const oldAgent = await Agent.findOne({ where: { email: req.body.email } });
    if (oldAgent) {
      res.status(400).send("El usuario ya existe");
      return;
    }
    // Verificar si el correo electrónico es válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      res.status(400).send("Por favor, introduce un correo electrónico válido");
      return;
    }
    // Verificar si la contraseña cumple los requisitos
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(req.body.password)) {
      res
        .status(400)
        .send(
          "La contraseña debe contener al menos una letra mayúscula, un número y tener una longitud mínima de 6 caracteres"
        );
      return;
    }

    const password = await bcrypt.hash(req.body.password, 10);

    const agent = await Agent.create({
      email: req.body.email,
      password: password,
    });

    res.send(agent);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Ocurrió un error al obtener los usuarios.",
    });
  }
};

const login = async (req, res) => {
  const email = req.body.email;
  let agent = await Agent.findOne({ where: { email: email } });
  if (!agent) {
    res.status(404).send("El usuario no existe");
    return;
  }
  let password = req.body.password;
  /*  if (await bcrypt.compare(password,agent.password)) { */ // esta linea es para cuando encriptemos las contraseñas
  if (password == agent.password) {
    res.send("Usuario y contraseña correctos");
  } else {
    res.status(401).send("Contraseña incorrecta");
  }
};

const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
};

export default {
  getAll,
  getById,
  create,
  login,
  logout,
};
