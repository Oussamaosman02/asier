import mongoose from "mongoose";
import { Endpoint, mongoConn } from "utils/mongo";

export default async function handler(req, res) {
  console.log("Connecting for adding");
  await mongoConn();
  console.log("Connected, you can add");
  const endpoint = await Endpoint.create(req.body);
  res.json({ endpoint });
  mongoose.connection.close();
  console.log("Closed connection, you can't add");
}
