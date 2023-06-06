import User from "../models/users.js";

const getAll = async (req, res) => {
  try {
    let users = await User.findAll({
      attributes: ["iduser", "email", "password", "name", "telephone"],
    });
    res.send(users);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving users.",
    });
  }
};

const getById = async (req, res) => {
  try {
    /* const iduser = req.user.id; */
    const iduser = req.params.id;
    let user = await User.findByPk(iduser, {
      attributes: ["iduser", "email", "password", "name", "telephone"],
    });
    res.send(user);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving users.",
    });
  }
};

const create = async (req, res) => {
  try {
    const oldUser = await User.findOne({ where: { email: req.body.email } });
    if (oldUser) {
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

    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
    });

    res.send(user);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Ocurrió un error al obtener los usuarios.",
    });
  }
};

const login = async (req, res) => {
  const email = req.body.email;
  let user = await User.findOne({ where: { email: email } });
  if (!user) {
    res.status(404).send("El usuario no existe");
    return;
  }
  let password = req.body.password;
  /*  if (await bcrypt.compare(password,user.password)) { */ // esta linea es para cuando encriptemos las contraseñas
  if (password == user.password) {
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
