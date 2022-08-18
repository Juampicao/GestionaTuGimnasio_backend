import Suscriptor from "../models/Suscriptor.js";
import Pagos from "../models/Pagos.js";

const pagarSuscripcion = async (req, res) => {
  const pago = new Pagos(req.body);

  pago.creador = req.usuario._id;
  pago.suscriptorPagador = req.body.suscriptorPagador;

  const suscriptor = await Suscriptor.findById(pago.suscriptorPagador);

  const montoPagoSuscripcion = req.body.montoPagoSuscripcion;
  // const fechaPagoSuscripcion = new Date(req.body.fechaPagoSuscripcion);
  const fechaPagoSuscripcion = req.body.fechaPagoSuscripcion;
  const notasPagoSuscripcion = req.body.notas;

  pago.pagoUnico = req.body.pagoUnico; // Guardar cualquier contenido.
  pago.pagoUnico = {
    montoPagoSuscripcion,
    fechaPagoSuscripcion,
    notasPagoSuscripcion,
  };

  try {
    const nuevoPagoGuardado = await pago.save();
    suscriptor.pagos = suscriptor.pagos.concat(nuevoPagoGuardado._id);
    await suscriptor.save();

    res.json(pago);
    console.log(`Nuevo pago $ ${montoPagoSuscripcion}`);
  } catch (error) {
    console.log(error);
  }
};

const EditarPagoSuscripcion = async (req, res) => {
  // 1° Editar el contenido de la nota
  const { id } = req.params;
  const pago = await Pagos.findById(id).where("creador").equals(req.usuario);

  pago.pagoUnico.montoPagoSuscripcion = req.body.montoPagoSuscripcion;
  pago.pagoUnico.fechaPagoSuscripcion = req.body.fechaPagoSuscripcion;
  pago.pagoUnico.notas = req.body.notas;

  try {
    const pagoEditado = await pago.save();
    console.log(pagoEditado);
    res.json(pagoEditado);
  } catch (error) {
    console.log(error);
  }
};

const DeletePagoSuscripcion = async (req, res) => {
  const { id } = req.params;
  const pago = await Pagos.findById(id).where("creador").equals(req.usuario);
  const suscriptor = await Suscriptor.findById(pago.suscriptorPagador);

  if (!pago) {
    const error = new Error("Ningun pago se ha encontrado");
    console.log(error);
    return res.status(404).json({ msg: error.message });
  }

  if (pago.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("No tienes permiso para eliminarr a este pago");
    console.log(error);
    return res.status(401).json({ msg: error.message });
  }

  //  Eliminar desde el suscriptor.
  const eliminarElemento = suscriptor.pagos.indexOf(pago._id);
  if (eliminarElemento > -1) {
    let elementoEliminado = suscriptor.pagos.splice(eliminarElemento, 1);
    console.log("Elemento Eliminado:" + elementoEliminado);
    let newArr = suscriptor.pagos;
    const guardarNuevoArr = await Suscriptor.updateOne(
      { _id: suscriptor },
      { $set: { pagos: newArr } }
    );
    console.log(`El nuevo arr de pagos es: ${newArr}`);
  }

  try {
    await Pagos.deleteOne();
    res.json({
      msg: `Pago del suscriptor: ${pago.suscriptorPagador} por $ ${pago.pagoUnico.montoPagoSuscripcion} Eliminado`,
    });
    console.log(
      `Pago ${pago.pagoUnico.montoPagoSuscripcion} Eliminado. El suscriptor Creador fue: ${suscriptor.nombre}`
    );
  } catch (error) {
    console.log(error);
  }
};

const GetPagoSuscripcionId = async (req, res) => {
  const { id } = req.params;
  const pago = await Pagos.findById(id).where("creador").equals(req.usuario);

  if (!pago) {
    const error = new Error("Ningun pago se ha encontrado");
    console.log(error);
    return res.status(404).json({ msg: error.message });
  }

  if (pago.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("No tienes permiso para ver a este pago");
    console.log(error);
    return res.status(401).json({ msg: error.message });
  }

  try {
    res.json(pago);
  } catch (error) {
    console.log(error);
  }
};

const GetPagosSuscripcionAllBySuscriptor = async (req, res) => {
  const pagos = await Pagos.find({
    $and: [
      { creador: req.usuario },
      { suscriptorPagador: req.params.suscriptorId },
    ],
  });

  if (!pagos) {
    const error = new Error("Ningun pago se ha encontrado");
    console.log(error);
    return res.status(404).json({ msg: error.message });
  }

  try {
    res.json(pagos);
  } catch (error) {
    console.log(error);
  }
};

const GetPagosSuscripcionAll = async (req, res) => {
  const { id } = req.params;

  const pagos = await Pagos.find()
    .where("creador")
    .equals(req.usuario)
    .select("pagoUnico suscriptorPagador");

  if (!pagos) {
    const error = new Error("Ningun pago se ha encontrado");
    console.log(error);
    return res.status(404).json({ msg: error.message });
  }

  if (pagos.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("No tienes permiso para ver estos pagos");
    console.log(error);
    return res.status(401).json({ msg: error.message });
  }

  try {
    res.json(pagos);
  } catch (error) {
    console.log(error);
  }
};

export {
  pagarSuscripcion,
  EditarPagoSuscripcion,
  DeletePagoSuscripcion,
  GetPagoSuscripcionId,
  GetPagosSuscripcionAllBySuscriptor,
  GetPagosSuscripcionAll,
};
