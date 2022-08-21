import Suscriptor from "../models/Suscriptor.js";
import Pagos from "../models/Pagos.js";

const getEstadisticasEstadosSuscriptores = async (req, res) => {
  const { id } = req.params;

  const suscriptoresActivos = await Suscriptor.find({
    $and: [{ creador: req.usuario }, { estado: "Activo" }],
  }).count();

  const suscriptoresDeudores = await Suscriptor.find({
    $and: [{ creador: req.usuario }, { estado: "Deudor" }],
  }).count();

  const suscriptoresTotales = await Suscriptor.find({
    $and: [{ creador: req.usuario }],
  }).count();

  // const obtenerEstadosSuscriptores = await Suscriptor.aggregate([
  //   {
  //     $match: {
  //       $and: [{ creador: req.usuario._id }],
  //     },
  //   },
  //   {
  //     $group: {
  //       _id: "$estado",
  //       estado: { $sum: 1 },
  //     },
  //   },
  // ]);

  const obtenerMontosTotalesPorMesPorCuota = await Pagos.aggregate([
    {
      $match: {
        $and: [{ creador: req.usuario._id }],
      },
    },
    {
      $group: {
        _id: {
          mes: { $month: "$pagoUnico.fechaPagoSuscripcion" },
        },
        montoPagoSuscripcion: { $sum: "$pagoUnico.montoPagoSuscripcion" },
      },
    },
  ]);

  try {
    console.log(
      suscriptoresActivos,
      suscriptoresDeudores,
      suscriptoresTotales,
      // obtenerEstadosSuscriptores,
      obtenerMontosTotalesPorMesPorCuota
    );
    res.json({
      suscriptoresActivos,
      suscriptoresDeudores,
      suscriptoresTotales,
      // obtenerEstadosSuscriptores,
      obtenerMontosTotalesPorMesPorCuota,
    });
  } catch (error) {
    console.log(error);
  }
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
  getEstadisticasEstadosSuscriptores,
  getSuscriptoresUnicosDeudores,
  getCantidadCuotasPagadas,
};
