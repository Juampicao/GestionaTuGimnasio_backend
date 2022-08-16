import express from "express";
import {
  pagarSuscripcion,
  EliminarPagoSuscripcion,
  EditarPagoSuscripcion,
  verPagoSuscripcionId,
  verPagosSuscripciones,
} from "../controllers/pagosController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router
  .route("/pagarsuscripcion")
  .post(checkAuth, pagarSuscripcion)
  .get(checkAuth, verPagosSuscripciones);

router
  .route("/pagarsuscripcion/:id")
  .get(checkAuth, verPagoSuscripcionId)
  .put(checkAuth, EditarPagoSuscripcion)
  .delete(checkAuth, EliminarPagoSuscripcion);

export default router;
