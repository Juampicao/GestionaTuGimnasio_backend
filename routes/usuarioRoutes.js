import express from "express";
import {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  validarToken,
  nuevoPassword,
  obtenerTiposSuscripcion,
  editarValoresSuscripcion,
  perfil,
} from "../controllers/usuarioController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

// Prueba en POSTMAN.
// router.get("/", (req, res) => {
//   res.send("Desde api/usuarios");
// });

// router.post("/", (req, res) => {
//   res.send("Post Usuarios");
// });

// Autenticacion, Registro y confirmacion de usuarios.
router.post("/", registrar);
router.post(`/login`, autenticar);
router.get(`/confirmar/:token`, confirmar);
router.post(`/olvide-password`, olvidePassword);
router.route(`/olvide-password/:token`).get(validarToken).post(nuevoPassword); // Si es get, validarToken, si es POST, nuevoPassword.
router
  .route(`/obtenertipossuscripcion`)
  .get(checkAuth, obtenerTiposSuscripcion)
  .put(checkAuth, editarValoresSuscripcion);
router.get(`/perfil`, checkAuth, perfil); // Con next(), va a perfil. Sino, no.

export default router;
