import { Router } from "express";
import userController from "../controllers/userController.js";
import verified from "../middlewares/jwt.js";

const router = Router();

// ruta para obtener todos los usuarios
router.get("/", (req, res) => {
  userController.getAll(req, res);
});

// ruta para obtener un usuario por id
router.get("/:id", (req, res) => {
  userController.getById(req, res);
});

// ruta para el registro
router.post("/register", (req, res) => {
  userController.create(req, res);
});

// ruta para el login
router.post("/login", (req, res) => {
  userController.login(req, res);
});

// ruta para el logout
router.get("/logout", (req, res) => {
  userController.logout(req, res);
});

// ruta para la info del usuario
router.post("/info", (req, res) => {
  userController.createUserInfo(req, res);
});

// ruta para editar un usuario
router.put("/edit", (req, res) => {
  userController.updateUser(req, res);
});

export default router;
