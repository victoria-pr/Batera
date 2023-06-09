import { Router } from "express";
import lonelyFormController from "../controllers/lonelyFormController.js";
import verified from "../middlewares/jwt.js";

const router = Router();

/* router.get("/", verified, (req, res) => {
  silverController.getAll(req, res);
}); */

// ruta para obtener un formulario por id
router.get("/:id", verified, (req, res) => {
  lonelyFormController.getById(req, res);
});

// ruta para crear un formulario
router.post("/create", (req, res) => {
  lonelyFormController.create(req, res);
});

// ruta para editar un formulario
/* router.put("/edit", (req, res) => {
  lonelyFormController.update(req, res);
}); */

// ruta para eliminar un formulario
router.delete("/delete", (req, res) => {
  lonelyFormController.delete(req, res);
});

export default router;
