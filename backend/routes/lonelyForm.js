import { Router } from "express";
import lonelyFormController from "../controllers/lonelyFormController.js";
import verified from "../middlewares/jwt.js";

const router = Router();

router.get("/", (req, res) => {
  lonelyFormController.getAll(req, res);
});

// ruta para obtener un formulario por id
router.get("/:id", verified, (req, res) => {
  lonelyFormController.getById(req, res);
});

// ruta para crear un formulario
router.post("/:id/create", verified, (req, res) => {
  lonelyFormController.create(req, res);
});

// ruta para editar un formulario
/* router.put("/edit", (req, res) => {
  lonelyFormController.update(req, res);
}); */

// ruta para eliminar un formulario
router.delete("/:id/delete", verified, (req, res) => {
  lonelyFormController.deleteForm(req, res);
});

export default router;
