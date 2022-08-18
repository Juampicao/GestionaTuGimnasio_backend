import mongoose from "mongoose";
import Suscriptor from "./suscriptor.js";
import Usuario from "./Usuario.js";

const PagosSchema = mongoose.Schema(
  {
    // fechaPagoSuscripcion: { type: Array },
    pagoUnico: {
      montoPagoSuscripcion: { type: Number, required: true },
      notasPagoSuscripcion: { type: String, required: false },
      // fechaPagoSuscripcion: { type: Date, default: new Date() },
      fechaPagoSuscripcion: {},
    },
    suscriptorPagador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Suscriptor",
    },
    creador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
  },
  {
    timestamps: true,
  }
);

const Pagos = mongoose.model("Pagos", PagosSchema);
export default Pagos;
