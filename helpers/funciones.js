import Suscriptor from "../models/Suscriptor.js";

export const verificarEstadoDeDeudas = async () => {
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // const { id } = req.params;

  console.log("Verificando estado de deudas...");
  let hoy = new Date();
  let suscriptoresTotales = await Suscriptor.find().count();
  console.log(suscriptoresTotales);

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
    for (let i = 0; i < suscriptoresTotales; i++) {
      const verificarEstados = await verificarEstadoDeDeudas();
      return;
    }
    res.json(verificarEstadoDeDeuda);
    res.json(verificarEstadoDeActivo);
  } catch (error) {
    console.log(error);
  }
};

export const generarId = () => {
  const random = Math.random().toString(32).substring(2);
  const fecha = Date.now().toString(32);
  return random + fecha;
};

export const generarNumeroSocio = () => {
  var aleatorio = Math.round(Math.random() * 999999);
  return aleatorio;
};

export default { verificarEstadoDeDeudas, generarId, generarNumeroSocio };
