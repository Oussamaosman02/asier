import mongoose from "mongoose";
import { Encuesta, mongoConn } from "utils/mongo";
export default async function handler(req, res) {
  const { id } = req.query;
  const cuerpo = req.body;
  console.log("Connecting");
  await mongoConn();
  console.log("Updating");

  const encuesta = await Encuesta.findByIdAndUpdate(id, cuerpo, {
    new: true,
  }).then((resultado) => {
    res.json(resultado);
  });
  mongoose.connection.close();
  console.log("Closed connection");
}
