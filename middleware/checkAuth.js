import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

const checkAuth = async (req, res, next) => {
  // console.log("Desde Checkauth..");
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      // console.log(token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.usuario = await Usuario.findById(decoded.id).select(
        "-password -confirmado -token -createdAt -updatedAt -__v"
      );
      // console.log(`el usuario activo es : ${req.usuario.nombre}`);

      return next();
    } catch (error) {
      console.log("Hubo un error");
      console.log(error);
      return res.status(404).json({ msg: "Hubo un error" });
    }
  }

  if (!token) {
    console.log("Token no valido");
    const error = new Error("Token no válido");
    return res.status(401).json({ msg: error.message });
  }

  next();
};

export default checkAuth;
