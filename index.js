import express from "express";
import conectarDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";

import usuarioRoutes from "./routes/usuarioRoutes.js";
import suscriptoreRoutes from "./routes/suscriptoresRoutes.js";
import estadisticasRoutes from "./routes/estadisticasRoutes.js";
import pagosRoutes from "./routes/pagosRoutes.js";

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
app.use(`/pagos`, pagosRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Servidor Corriendo en el puerto 4000");
});

// const verificarEstadoDeDeudas = async () => {
//   let hoy = new Date();
//   console.log("Dia de hoy: " + hoy);
//   let suscriptoresTotales = await Suscriptor.find().count();
//   let suscriptoresActivos = await Suscriptor.find()
//     .where("estado")
//     .equals("Activo")
//     .count();
//   let suscriptoresDeudores = await Suscriptor.find()
//     .where("estado")
//     .equals("Deudor")
//     .count();

//   console.log(
//     "Totales " +
//       suscriptoresTotales +
//       " Activos: " +
//       suscriptoresActivos +
//       " Deudores: " +
//       suscriptoresDeudores
//   );

//   const verificarEstadoDeActivo = await Suscriptor.updateMany(
//     { "fechas.fechaVencimientoSuscripcion": { $gte: hoy } },
//     { $set: { estado: "Activo" } }
//   ).select("nombre fechas.fechaVencimientoSuscripcion");
//   // console.log(verificarEstadoDeActivo);

//   const verificarEstadoDeDeuda = await Suscriptor.updateMany(
//     { "fechas.fechaVencimientoSuscripcion": { $lt: hoy } },
//     { $set: { estado: "Deudor" } }
//   ).select("nombre fechas.fechaVencimientoSuscripcion");
//   // console.log(verificarEstadoDeDeuda);

//   try {
//     console.log(
//       "Totales " +
//         suscriptoresTotales +
//         " Activos: " +
//         suscriptoresActivos +
//         " Deudores: " +
//         suscriptoresDeudores
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };
// verificarEstadoDeDeudas();

// const diaHoy = new Date();
// console.log(diaHoy);

// const diaHoyModificado = diaHoy.slice(0, 9);
// console.log(diaHoyModificado);
