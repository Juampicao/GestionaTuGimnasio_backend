import express from "express";

import {
  obtenerSuscriptores,
  obtenerSuscriptorId,
  crearSuscriptor,
  editarSuscriptorId,
  eliminarSuscriptorId,
} from "../controllers/suscriptoresController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router
  .route(`/`)
  // .get(checkAuth, obtenerSuscriptores)
  .get(obtenerSuscriptores)

  .post(checkAuth, crearSuscriptor);

router
  .route("/:id")
  .get(obtenerSuscriptorId)
  .put(checkAuth, editarSuscriptorId)
  .delete(eliminarSuscriptorId);

export default router;
