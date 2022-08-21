import express from "express";
import { getEstadisticasEstadosSuscriptores } from "../controllers/estadisticasController.js";

import checkAuth from "../middleware/checkAuth.js";
const router = express.Router();

router
  .route(`/`)
  .get(checkAuth, getEstadisticasEstadosSuscriptores)
  .post(checkAuth);

export default router;
