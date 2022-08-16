import express from "express";
import conectarDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";

import usuarioRoutes from "./routes/usuarioRoutes.js";
import suscriptoreRoutes from "./routes/suscriptoresRoutes.js";
import estadisticasRoutes from "./routes/estadisticasRoutes.js";

import Suscriptor from "./models/Suscriptor.js";
import Usuario from "./models/Usuario.js";
// import { verificarEstadoDeDeudas } from "./helpers/funciones.js";

const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

// const whitelist = [`http://localhost:3000`];

console.log(`La variable de entorno es ${process.env.FRONTEND_URL}`);

// Configurar CORS
const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      // Puede consultar la API
      callback(null, true);
    } else {
      // No esta permitido
      callback(new Error("Esta URL no esta permitida."));
    }
  },
};

app.use(cors(corsOptions));

// Routing
app.use(`/usuarios`, usuarioRoutes);
app.use(`/suscriptores`, suscriptoreRoutes);
app.use(`/estadisticas`, estadisticasRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Servidor Corriendo en el puerto 4000");
});

const verificarEstadoDeDeudas = async () => {
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // const { id } = req.params;

  console.log("Verificando estado de deudas...");
  let hoy = new Date();
  // let suscriptoresTotales = await Suscriptor.find().count();
  // console.log(suscriptoresTotales);

  const verificarEstadoDeActivo = await Suscriptor.findOneAndUpdate(
    { "fechas.fechaVencimientoSuscripcion": { $gte: hoy } },
    { $set: { estado: "Activo" } }
  ).select("nombre fechas.fechaVencimientoSuscripcion");
  console.log(verificarEstadoDeActivo);

  const verificarEstadoDeDeuda = await Suscriptor.findOneAndUpdate(
    { "fechas.fechaVencimientoSuscripcion": { $lt: hoy } },
    { $set: { estado: "Deudor" } }
  ).select("nombre fechas.fechaVencimientoSuscripcion");
  console.log(verificarEstadoDeDeuda);

  try {
    // for (let i = 0; i < suscriptoresTotales; i++) {
    const verificarEstados = await verificarEstadoDeDeudas();
    //   return;
    // }
    res.json(verificarEstadoDeDeuda);
    res.json(verificarEstadoDeActivo);
  } catch (error) {
    console.log(error);
  }
};
// verificarEstadoDeDeudas();
