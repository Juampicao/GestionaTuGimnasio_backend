import Suscriptor from "../models/Suscriptor.js";

// export const verificarEstadoPorId = async (suscriptor, fecha) => {
//   let hoy = new Date();

//   if (suscriptor.fechas.fechaVencimientoSuscripcion < hoy) {
//     suscriptor.estado = "Deudor";
//     console.log("Cambio a Deudor");
//   } else if (suscriptor.fechas.fechaVencimientoSuscripcion >= hoy) {
//     suscriptor.estado = "Activo";
//     console.log("Cambio a Activo");
//   }
// };

export const generarId = () => {
  const random = Math.random().toString(32).substring(2);
  const fecha = Date.now().toString(32);
  return random + fecha;
};

export const generarNumeroSocio = () => {
  var aleatorio = Math.round(Math.random() * 999999);
  return aleatorio;
};

export default {
  // verificarEstadoDeDeudas,
  generarId,
  generarNumeroSocio,
  // verificarEstadoPorId,
};

// 1 Verificar por id =>
// Pasarlo a CrearPago con params

// 2 VerificarEstadoDeudas Global =>
//
