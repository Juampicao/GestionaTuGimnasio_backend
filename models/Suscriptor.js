import mongoose from "mongoose";

const SuscriptorSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: true,
    },
    estado: {
      type: String,
      required: true,
      default: "Deudor",
    },
    informacionPersonal: {
      imagen: {},
      domicilio: {},
      fechaNacimiento: { type: Date },
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
      fechaPagoSuscripcion: {
        type: Array,
      },
      fechaVencimientoSuscripcion: {
        type: Date,
      },
    },
    rutina: { type: Array },
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
