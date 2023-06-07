import { Router } from "express";
import jwt from "jsonwebtoken";
import Agent from "../models/agents.js";
import bcrypt from "bcrypt";

const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let agent = await Agent.findOne({ where: { email: email } });
    if (!agent) {
      res.status(400).send("Usuario no encontrado");
    }

    let result = await bcrypt.compare(password, agent.password);

    if (!result) {
      res.status(401).send("Contraseña incorrecta");
      return;
    }

    const token = jwt.sign(
      {
        name: agent.email,
        id: agent.agent_id,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "12h" }
    );
    res.send({ email: agent.email, token: token, id: agent.agent_id });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al iniciar sesión");
  }
});

authRouter.get("/logout", (req, res) => {
  res.clearCookie("access_token").send("Logout successfull!");
});

export default authRouter;
