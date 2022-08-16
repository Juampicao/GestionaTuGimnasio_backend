import Suscriptor from "../models/Suscriptor.js";
import Pagos from "../models/Pagos.js";

const pagarSuscripcion = async (req, res) => {
  // const { id } = req.params;

  console.log("desde pagos");
  const pago = new Pagos(req.body);
  pago.creador = req.usuario._id;
  pago.suscriptorPagador = req.body.suscriptorPagador;

  const montoPagoSuscripcion = req.body.montoAPagar;
  const fechaPagoSuscripcion = new Date(req.body.fechaPagoSuscripcion);
  const notasPagoSuscripcion = req.body.notas;

  pago.pagoUnico = req.body.pagoUnico;

  try {
    const nuevoPagoGuardado = await pago.save();
    res.json(pago);
    console.log(`Nuevo pago ${pago}`);
  } catch (error) {
    console.log(error);
  }
};

const EditarPagoSuscripcion = async (req, res) => {
  const { id } = req.params;
  const suscriptor = await Suscriptor.findById(req.body._id);
  // console.log(suscriptor.nombre + " " + "Socio: " + suscriptor.socio);
  console.log(suscriptor);
};

const EliminarPagoSuscripcion = async (req, res) => {
  const { id } = req.params;
  const suscriptor = await Suscriptor.findById(id);
  // 1 Buscar el suscriptor por id.
  // 2 Buscar el pago del suscriptor que coincida con el id.
  // 3 Eliminarlo.
  console.log(suscriptor);
};

const verPagoSuscripcionId = async (req, res) => {
  console.log("desde pagos");
  const { id } = req.params;

  const pago = await Pagos.findById(id)
    .where("suscriptorPagador")
    .equals("62fbc0531f46fb73eec9b806");
  console.log(pago);
  res.json(pago);

  //  const pago = new Pagos(req.body);
  //  pago.creador = req.usuario._id;
  //  pago.suscriptorPagador = req.body.suscriptorPagador;
};

const verPagosSuscripciones = async (req, res) => {
  console.log("desde todos..");
  let suscriptorPagador = req.body.suscriptorPagador;
  const pago = await Pagos.find()
    .where("suscriptorPagador")
    .equals(suscriptorPagador);
  res.json(pago);
};

export {
  pagarSuscripcion,
  EditarPagoSuscripcion,
  EliminarPagoSuscripcion,
  verPagoSuscripcionId,
  verPagosSuscripciones,
};
