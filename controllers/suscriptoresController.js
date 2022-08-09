import Suscriptor from "../models/Suscriptor.js";

const obtenerSuscriptores = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const suscriptores = await Suscriptor.find();
  // .select(
  // `nombre estado fechas.fechaVencimientoSuscripcion`
  // );
  // .where("creador")
  // .equals(req.usuario);
  console.log(suscriptores);

  if (!suscriptores) {
    const error = new Error("Suscriptor No Encontrado");
    console.log(error);
    return res.status(404).json({ msg: error.message });
  }

  if (!suscriptores) {
    const error = new Error("Ningun Suscriptor se ha encontrado");
    console.log(error);
    return res.status(404).json({ msg: error.message });
  }

  // if (suscriptor.creador.toString() !== req.usuario._id.toString()) {
  //   const error = new Error("No eres el creador de este Suscriptor");
  //   console.log(error);
  //   return res.status(401).json({ msg: error.message });
  // }

  res.json({
    suscriptores,
  });
};

const obtenerSuscriptorId = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { id } = req.params;
  const suscriptor = await Suscriptor.findById(id);

  if (!suscriptor) {
    const error = new Error("Suscriptor No Encontrado");
    console.log(error);
    return res.status(404).json({ msg: error.message });
  }

  if (!suscriptor) {
    const error = new Error("Ningun Suscriptor se ha encontrado");
    console.log(error);
    return res.status(404).json({ msg: error.message });
  }

  // if (suscriptor.creador.toString() !== req.usuario._id.toString()) {
  //   const error = new Error("No eres el creador de este Suscriptor");
  //   console.log(error);
  //   return res.status(401).json({ msg: error.message });
  // }

  res.json(suscriptor);
  console.log(suscriptor.nombre, suscriptor._id);
};

const crearSuscriptor = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const suscriptor = new Suscriptor(req.body);
  suscriptor.creador = req.usuario._id;
  console.log(`El usuario creador es: ${req.usuario.nombre}`);

  try {
    const suscriptorAlmacenado = await suscriptor.save();
    console.log(suscriptorAlmacenado);
    res.json(suscriptorAlmacenado);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const editarSuscriptorId = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { id } = req.params;
  const suscriptor = await Suscriptor.findOneAndUpdate(id);

  if (!suscriptor) {
    const error = new Error("suscriptor No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  // if (suscriptor.creador.toString() !== req.usuario._id.toString()) {
  //   const error = new Error(
  //     "No puede editar, no eres el creador de este suscriptor"
  //   );
  //   console.log(error);
  //   return res.status(401).json({ msg: error.message });
  // }

  suscriptor.nombre = req.body.nombre || suscriptor.nombre;
  suscriptor.informacionPersonal.domicilio =
    req.body.informacionPersonal.domicilio ||
    suscriptor.informacionPersonal.domicilio;
  suscriptor.informacionPersonal.fechaNacimiento =
    req.body.informacionPersonal.fechaNacimiento ||
    suscriptor.informacionPersonal.fechaNacimiento;
  suscriptor.tipoSuscripcion =
    req.body.tipoSuscripcion || suscriptor.tipoSuscripcion;

  suscriptor.fechas.fechaAlta =
    req.body.fechas.fechaAlta || suscriptor.fechas.fechaAlta;
  suscriptor.fechas.fechaPagoSuscripcion =
    req.body.fechas.fechaPagoSuscripcion ||
    suscriptor.fechas.fechaPagoSuscripcion;
  suscriptor.fechas.fechaVencimientoSuscripcion =
    req.body.fechas.fechaVencimientoSuscripcion ||
    suscriptor.fechas.fechaVencimientoSuscripcion;

  suscriptor.rutina = req.body.rutina || suscriptor.rutina;

  try {
    const suscriptorAlmacenado = await suscriptor.save();
    res.json(suscriptorAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const eliminarSuscriptorId = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  console.log("desde eliminar");
  const { id } = req.params;

  const suscriptor = await Suscriptor.findById(id);

  if (!suscriptor) {
    const error = new Error("Ningun suscriptor se ha encontrado");
    console.log(error);
    return res.status(404).json({ msg: error.message });
  }

  // if (suscriptor.creador.toString() !== req.usuario._id.toString()) {
  //   const error = new Error(
  //     "No tienes permiso para eliminarr a este suscriptor"
  //   );
  //   console.log(error);
  //   return res.status(401).json({ msg: error.message });
  // }

  try {
    await Suscriptor.deleteOne();
    res.json({ msg: `Suscriptor ${suscriptor.nombre} Eliminado` });
    console.log(`Suscriptor ${suscriptor.nombre} Eliminado`);
  } catch (error) {
    console.log(error);
  }
};

export {
  obtenerSuscriptores,
  obtenerSuscriptorId,
  crearSuscriptor,
  editarSuscriptorId,
  eliminarSuscriptorId,
};
