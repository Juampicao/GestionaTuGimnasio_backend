import mongoose from "mongoose";
import generarNumeroSocio from "../helpers/generarNumeroSocio.js";

const SuscriptorSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    socio: {
      type: Number,
      required: true,
      default: generarNumeroSocio(),
      unique: true,
    },
    estado: {
      type: String,
      required: true,
      default: "Deudor",
    },
    informacionPersonal: {
      imagen: {},
      domicilio: { type: String },
      dni: { type: Number },
      celular: { type: Number },
      correo: {},
      genero: {},
      fechaNacimiento: {},
      notas: {},
    },
    tipoSuscripcion: {
      type: String,
      trim: true,
      required: true,
      default: "Estandar",
    },
    fechas: {
      fechaAlta: {
        type: Date,
        default: new Date(),
      },
      fechaPagoSuscripcion: { type: Array },
      fechaVencimientoSuscripcion: {
        type: Date,
        default: new Date(),
      },
    },
    rutina: { type: Array, default: [""] },
    creador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
    // tareas: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Tarea",
    //   },
    // ],
    // colaboradores: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Usuario",
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

const Gasto = mongoose.model("Suscriptor", SuscriptorSchema);
export default Gasto;
