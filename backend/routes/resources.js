import { Router } from "express";
import resourceController from "../controllers/resourceController.js";
import verified from "../middlewares/jwt.js";

const router = Router();

// ruta para obtener todos los recursos

router.get("/", (req, res) => {
  resourceController.getAll(req, res);
});

// ruta para obtener un recurso por id
router.get("/:id", verified, (req, res) => {
  resourceController.getById(req, res);
});

// ruta para crear un recurso
router.post("/:id/create", verified, (req, res) => {
  resourceController.create(req, res);
});

// ruta para eliminar un recurso
router.delete("/:id/delete", (req, res) => {
  resourceController.deleteById(req, res);
});

export default router;
