import { Router } from "express";
import silverController from "../controllers/silverController.js";
import verified from "../middlewares/jwt.js";

const router = Router();

// ruta para obtener todos los usuarios
router.get("/", verified, (req, res) => {
  silverController.getAll(req, res);
});

// ruta para obtener un usuario por id
router.get("/:id", verified, (req, res) => {
  silverController.getById(req, res);
});

export default router;
