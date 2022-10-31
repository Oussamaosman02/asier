import mongoose from "mongoose";
import { mongoConn, Tarea } from "utils/mongo";

export default async function getProps() {
  console.log("Connecting for adding");
  await mongoConn();
  console.log("Connected, you can add");
  const tarea = await Tarea.find({});
  const res = JSON.parse(JSON.stringify(tarea));
  mongoose.connection.close();
  console.log("Closed connection, you can't add");
  const datos = await res;
  return {
    props: {
      datos,
    },
  };
}
