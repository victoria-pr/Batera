import { Router } from "express";
import resourceController from "../controllers/resourceController.js";
import verified from "../middlewares/jwt.js";

const router = Router();

// ruta para obtener todos los recursos

router.get("/", (req, res) => {
  resourceController.getAll(req, res);
});

// ruta para obtener un recurso por id
router.get("/:id", (req, res) => {
  resourceController.getById(req, res);
});

// ruta para crear un recurso
router.post("/:id/create", (req, res) => {
  resourceController.create(req, res);
});

export default router;
