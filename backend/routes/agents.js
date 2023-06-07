import { Router } from "express";
import agentController from "../controllers/agentController.js";
import verified from "../middlewares/jwt.js";

const router = Router();

// ruta para obtener todos los usuarios
/* router.get("/", verified, (req, res) => {
  agentController.getAll(req, res);
}); */

// ruta para obtener un usuario por id
router.get("/", verified, (req, res) => {
  agentController.getById(req, res);
});

// ruta para el registro
router.post("/register", (req, res) => {
  agentController.create(req, res);
});

// ruta para el login
router.post("/login", (req, res) => {
  agentController.login(req, res);
});

// ruta para el logout
router.get("/logout", (req, res) => {
  agentController.logout(req, res);
});

// ruta para la info del usuario
router.post("/info", (req, res) => {
  agentController.createagentInfo(req, res);
});

// ruta para editar un usuario
router.put("/edit", (req, res) => {
  agentController.updateagent(req, res);
});

export default router;
