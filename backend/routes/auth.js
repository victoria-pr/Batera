import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/users.js";
import bcrypt from "bcrypt";

const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ where: { email: email } });
    if (!user) {
      res.status(400).send("Usuario no encontrado");
    }

    let result = await bcrypt.compare(password, user.password);

    if (!result) {
      res.status(401).send("Contraseña incorrecta");
      return;
    }

    const token = jwt.sign(
      {
        name: user.email,
        id: user.iduser,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "12h" }
    );
    res.send({ email: user.email, token: token, id: user.iduser });
  } catch (error) {
    res.status(500).send("Error al iniciar sesión");
  }
});

authRouter.get("/logout", (req, res) => {
  res.clearCookie("access_token").send("Logout successfull!");
});

export default authRouter;
