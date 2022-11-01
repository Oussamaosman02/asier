import mongoose from "mongoose";
import { mongoConn, Tarea, Encuesta } from "utils/mongo";

export async function getIdn(query) {
  console.log("Connecting for adding");
  await mongoConn();
  console.log("Connected, you can add");
  const tarea = await Tarea.find({});
  const res = JSON.parse(JSON.stringify(tarea));
  mongoose.connection.close();
  console.log("Closed connection, you can't add");
  const datos = res.find((ele) => ele.id === query.id);
  return {
    props: {
      datos,
    },
  };
}

export async function getDay(query) {
  console.log("Connecting for adding");
  await mongoConn();
  console.log("Connected, you can add");
  const tarea = await Tarea.find({});
  const res = JSON.parse(JSON.stringify(tarea));
  mongoose.connection.close();
  console.log("Closed connection, you can't add");
  const respu = await res;

  const year = new Date().getFullYear();
  const tiempoMas = 86399000;
  const fechaActual =
    new Date(year, query.month - 1, query.day).getTime() + tiempoMas;

  //datos que devuelve
  const datos = respu.filter((fec) => fec.fecha === fechaActual);
  const data = query;
  return {
    props: {
      data,
      datos,
    },
  };
}

export async function getEncuesta() {
  console.log("Connecting for adding");
  await mongoConn();
  console.log("Connected, you can add");
  const encuesta = await Encuesta.find({});
  const res = JSON.parse(JSON.stringify(encuesta));
  mongoose.connection.close();
  console.log("Closed connection, you can't add");
  const datos = await res;
  return {
    props: {
      datos,
    },
  };
}

export async function getEncId(query) {
  console.log("Connecting for adding");
  await mongoConn();
  console.log("Connected, you can add");
  const encuesta = await Encuesta.find({});
  const res = JSON.parse(JSON.stringify(encuesta));
  mongoose.connection.close();
  console.log("Closed connection, you can't add");
  const datos = await res.find((ele) => ele.id === query.id);
  return {
    props: {
      datos,
    },
  };
}
