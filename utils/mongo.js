import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";
import { config } from "dotenv";
//mnogo conf
config();
const string = process.env.MONGO_URI;
export const mongoConn = async () => mongoose.connect(string);

//mongo schema

const newEndpoints = new Schema({
  endpoint: {
    type: String,
    unique: true,
  },
  expirationTime: String,
  keys: {
    p256dh: String,
    auth: String,
  },
});

newEndpoints.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
export const Endpoint = models.Endpoint || model("Endpoint", newEndpoints);

const newTareas = new Schema({
  fecha: Number,
  fechaString: String,
  titulo: String,
  descripcion: String,
  tipo: String,
  coments: Array,
});

newTareas.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Tarea = models.Tarea || model("Tarea", newTareas);
