import Suscriptor from "../models/Suscriptor.js";
import { verificarEstadoDeDeudas } from "../helpers/funciones.js";
import { generarId } from "../helpers/generarId.js";

import Pagos from "../models/Pagos.js";

const obtenerSuscriptores = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const suscriptores = await Suscriptor.find()
    .select(
      `nombre estado fechas.fechaVencimientoSuscripcion socio tipoSuscripcion`
    )
    .where("creador")
    .equals(req.usuario);
  // console.log(suscriptores);

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

  // if (suscriptores.creador.toString() !== req.usuario._id.toString()) {
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
  // const suscriptor2 = await Suscriptor.findById(id).populate("pagos");

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

  if (suscriptor.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("No eres el creador de este Suscriptor");
    console.log(error);
    return res.status(401).json({ msg: error.message });
  }

  res.json(suscriptor);
  console.log(suscriptor.nombre, suscriptor._id);
};

const obtenerSuscriptorBySocio = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { id } = req.params;
  const suscriptor = await Suscriptor.find()
    .where("socio")
    .equals(req.body.socio);
  console.log(suscriptor);

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

  if (suscriptor.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("No eres el creador de este Suscriptor");
    console.log(error);
    return res.status(401).json({ msg: error.message });
  }

  res.json(suscriptor);
  console.log(suscriptor.nombre, suscriptor._id);
};

const crearSuscriptor = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const suscriptor = new Suscriptor(req.body);

  suscriptor.creador = req.usuario._id;
  suscriptor.informacionPersonal.domicilio = req.body.domicilio;
  suscriptor.informacionPersonal.correo = req.body.correo;
  suscriptor.informacionPersonal.celular = req.body.celular;
  suscriptor.informacionPersonal.dni = req.body.dni;
  suscriptor.informacionPersonal.notas = req.body.notas;
  suscriptor.informacionPersonal.genero = req.body.genero;

  suscriptor.informacionPersonal.fechaNacimiento = new Date(
    req.body.fechaNacimiento
  );
  console.log(`El usuario creador es: ${req.usuario.nombre}`);

  try {
    const suscriptorAlmacenado = await suscriptor.save();
    console.log(suscriptorAlmacenado.nombre);
    res.json(suscriptorAlmacenado);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const editarSuscriptorId = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log("desde editar..");
  const { id } = req.params;
  const suscriptor = await Suscriptor.findById(id);

  if (!suscriptor) {
    const error = new Error("suscriptor No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (suscriptor.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error(
      "No puede editar, no eres el creador de este suscriptor"
    );
    console.log(error);
    return res.status(401).json({ msg: error.message });
  }

  suscriptor.nombre = req.body.nombre || suscriptor.nombre;
  suscriptor.informacionPersonal.domicilio =
    req.body.domicilio || suscriptor.informacionPersonal.domicilio;
  suscriptor.informacionPersonal.celular =
    req.body.celular || suscriptor.informacionPersonal.celular;
  suscriptor.informacionPersonal.dni =
    req.body.dni || suscriptor.informacionPersonal.dni;
  suscriptor.informacionPersonal.fechaNacimiento =
    req.body.fechaNacimiento || suscriptor.informacionPersonal.fechaNacimiento;
  suscriptor.informacionPersonal.genero =
    req.body.genero || suscriptor.informacionPersonal.genero;
  suscriptor.informacionPersonal.correo =
    req.body.correo || suscriptor.informacionPersonal.correo;
  suscriptor.informacionPersonal.notas =
    req.body.notas || suscriptor.informacionPersonal.notas;

  suscriptor.tipoSuscripcion =
    req.body.tipoSuscripcion || suscriptor.tipoSuscripcion;

  // suscriptor.fechas.fechaAlta =
  //   req.body.fechas.fechaAlta || suscriptor.fechas.fechaAlta;
  // suscriptor.fechas.fechaPagoSuscripcion =
  //   req.body.fechas.fechaPagoSuscripcion ||
  //   suscriptor.fechas.fechaPagoSuscripcion;
  // suscriptor.fechas.fechaVencimientoSuscripcion =
  //   req.body.fechas.fechaVencimientoSuscripcion ||
  //   suscriptor.fechas.fechaVencimientoSuscripcion;

  // suscriptor.rutina = req.body.rutina || suscriptor.rutina;

  try {
    const suscriptorAlmacenado = await suscriptor.save();
    res.json(suscriptorAlmacenado);
    console.log(suscriptorAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const editarRutina = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { id } = req.params;
  const suscriptor = await Suscriptor.findOneAndUpdate(id);

  if (!suscriptor) {
    const error = new Error("suscriptor No Encontrado");
    return res.status(404).json({ msg: error.message });
  }
  // suscriptor.rutina = req.body.rutina || suscriptor.rutina;

  try {
    const id = req.params.id;
    const updates = req.body;
    const options = { new: true };

    const result = await Suscriptor.findByIdAndUpdate(id, updates, options);
    res.send(result);
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

  if (suscriptor.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error(
      "No tienes permiso para eliminarr a este suscriptor"
    );
    console.log(error);
    return res.status(401).json({ msg: error.message });
  }

  try {
    await Suscriptor.deleteOne();
    res.json({ msg: `Suscriptor ${suscriptor.nombre} Eliminado` });
    console.log(`Suscriptor ${suscriptor.nombre} Eliminado`);
  } catch (error) {
    console.log(error);
  }
};

const pagarSuscripcion = async (req, res) => {
  const { id } = req.params;

  const suscriptor = await Suscriptor.findById(req.body.suscriptorAPagar._id);

  // 1° Nueva Fecha Vencimiento
  const nuevaFechaVencimientoSuscripcion =
    req.body.nuevaFechaVencimientoSuscripcion;

  suscriptor.fechas.fechaVencimientoSuscripcion =
    nuevaFechaVencimientoSuscripcion;

  // 2° Guardar fecha de pago.
  const montoPagoSuscripcion = req.body.montoAPagar;
  const nuevoPagoSuscripcion = req.body.fechaPagoSuscripcion;
  const nuevoId = generarId();

  const cambiarFechaPagoSuscripcion = await Suscriptor.updateOne(
    { _id: req.body.suscriptorAPagar._id },
    {
      $push: {
        "fechas.fechaPagoSuscripcion": {
          id: nuevoId,
          MontoPagoSuscripcion: montoPagoSuscripcion,
          FechaDePago: nuevoPagoSuscripcion,
        },
      },
    }
  );

  try {
    const nuevoPagoGuardado = await suscriptor.save();
    // const verificarEstados = await verificarEstadoDeDeudas();
    res.json(nuevoPagoGuardado);
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

export {
  obtenerSuscriptores,
  obtenerSuscriptorId,
  obtenerSuscriptorBySocio,
  crearSuscriptor,
  editarSuscriptorId,
  eliminarSuscriptorId,
  pagarSuscripcion,
  EliminarPagoSuscripcion,
  EditarPagoSuscripcion,
  editarRutina,
};
