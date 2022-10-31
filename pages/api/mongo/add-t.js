import mongoose from "mongoose";
import { mongoConn, Tarea } from "utils/mongo";

export default async function handler(req, res) {
  console.log("Connecting for adding");
  await mongoConn();
  console.log("Connected, you can add");
  const tarea = await Tarea.create(req.body);
  res.json({ tarea });
  mongoose.connection.close();
  console.log("Closed connection, you can't add");
}
