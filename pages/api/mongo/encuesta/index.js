import mongoose from "mongoose";
import { mongoConn, Encuesta } from "utils/mongo";

export default async function handler(req, res) {
  console.log("Connecting for adding");
  await mongoConn();
  console.log("Connected, you can add");
  const encuesta = await Encuesta.create(req.body);
  res.json({ encuesta });
  mongoose.connection.close();
  console.log("Closed connection, you can't add");
}
