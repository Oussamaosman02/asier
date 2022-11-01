import mongoose from "mongoose";
import { User, mongoConn } from "utils/mongo";
const registro = process.env.REGISTRAR;
export default async function CreateUser(req, res) {
  console.log(registro);
  const resp = req.body;
  console.log("Connecting for adding");
  await mongoConn();
  console.log("Connected, you can add");
  if (registro === "si") {
    try {
      const user = await User.create(resp);
      mongoose.connection.close();
      res.status(200).json({ exit: true });
      console.log("registrado");
      console.log("Closed connection, you can't add");
    } catch (err) {
      if ((err.code = 11000)) {
        res.json({ problema: "Ya existe" });
      } else {
        res.json({ problema: "No se ha podido crear el usuario" });
      }
    }
  } else {
    try {
      const usuario = resp.user;
      const clave = resp.key;
      const user = await User.findOne({ user: usuario, key: clave });
      if (!user) {
        res.json({ problema: "No se ha podido iniciar sesión" });
      } else {
        mongoose.connection.close();
        console.log("autenticado");
        res.status(200).json({ exit: true });
        console.log("Closed connection, you can't add");
      }
    } catch (err) {
      res.json({ problema: "No se ha podido iniciar sesión" });
    }
  }
}
