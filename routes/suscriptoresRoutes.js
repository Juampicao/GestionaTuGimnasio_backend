import express from "express";
// import { verificarEstadoDeDeudas } from "../helpers/funciones.js";

import {
  obtenerSuscriptores,
  obtenerSuscriptorId,
  obtenerSuscriptorBySocio,
  crearSuscriptor,
  editarSuscriptorId,
  eliminarSuscriptorId,
  pagarSuscripcion,
  EliminarPagoSuscripcion,
  EditarPagoSuscripcion,
  editarRutina,
  verificarEstadoDeDeudas,
} from "../controllers/suscriptoresController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router
  .route(`/`)
  .get(checkAuth, obtenerSuscriptores)

  .post(checkAuth, crearSuscriptor);

router
  .route("/:id")
  .get(checkAuth, obtenerSuscriptorId)
  .put(checkAuth, editarSuscriptorId)
  .delete(checkAuth, eliminarSuscriptorId);

router.route("/rutina/:id").put(checkAuth, editarRutina);

router.route("/pagarsuscripcion").post(checkAuth, pagarSuscripcion);

router
  .route("/pagarsuscripcion/:id")
  .put(checkAuth, EditarPagoSuscripcion)
  .delete(checkAuth, EliminarPagoSuscripcion);

router
  .route("/obtenersuscriptorporsocio")
  .get(checkAuth, obtenerSuscriptorBySocio);

router.route("/verificarestadodeuda").get(checkAuth, verificarEstadoDeDeudas);

export default router;
