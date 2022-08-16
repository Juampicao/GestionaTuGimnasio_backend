import Suscriptor from "../models/Suscriptor.js";

const getSuscriptoresUnicosActivos = async (req, res) => {
  const suscriptoresUnicosActivos = await Suscriptor.find()
    .where("estado")
    .equals("Activo")
    .count();

  console.log(suscriptoresUnicosActivos);
  res.json({
    suscriptoresUnicosActivos,
  });
};

const getSuscriptoresUnicosDeudores = async (req, res) => {
  const suscriptoresUnicosDeudores = await Suscriptor.find()
    .where("estado")
    .equals("Deudor")
    .count();

  console.log(suscriptoresUnicosDeudores);
  res.json({
    suscriptoresUnicosDeudores,
  });
};

const getCantidadCuotasPagadas = async (req, res) => {
  const suscriptoresUnicosDeudores = await Suscriptor.find()
    .where("estado")
    .equals("Deudor")
    .count();

  console.log(suscriptoresUnicosDeudores);
  res.json({
    suscriptoresUnicosDeudores,
  });
};

// const obtenerCuotasPagadasPorMes = await Suscriptor.aggregate([
//   {
//     $group: {
//       _id: {
//         VencimientoPorMes: { $month: "$fechas.fechaVencimientoSuscripcion" },
//       },
//       count: { $sum: 1 },
//     },
//   },
// ]);

// console.log(obtenerCuotasPagadasPorMes);

// SuscriptoresUnicosActivos.
// Pago de suscripciones del mes.
// Ganancias Bruta del mes (utilidad ingresos - gastos).

export {
  getSuscriptoresUnicosActivos,
  getSuscriptoresUnicosDeudores,
  getCantidadCuotasPagadas,
};
