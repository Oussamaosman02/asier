import { mongoConn, Tarea, Encuesta } from 'utils/mongo'
import mongoose from 'mongoose'

export async function getIdn (query) {
  console.log('Connecting for getting id')
  await mongoConn()
  console.log('Connected, you can get id')
  const tarea = await Tarea.find({})
  const res = JSON.parse(JSON.stringify(tarea))
  mongoose.connection.close()
  console.log('Closed connection, everything get')
  const datos = await res.find(ele => ele.id === query.id)
  return {
    props: {
      datos
    }
  }
}

export async function getDay (query) {
  console.log('Connecting for getting day')
  await mongoConn()
  console.log('Connected, getting day info')
  const tarea = await Tarea.find({})
  const res = JSON.parse(JSON.stringify(tarea))
  mongoose.connection.close()
  console.log('Closed connection, day info getted')

  const year = new Date().getFullYear()
  const tiempoMas = 86399000
  const fechaActual =
    new Date(year, query.month - 1, query.day).getTime() + tiempoMas

  // datos que devuelve
  const datos = await res.filter(fec => fec.fecha === fechaActual)
  console.log(datos)
  const data = query
  console.log(data)
  return {
    props: {
      data,
      datos
    }
  }
}

export async function getEncuesta () {
  console.log('Connecting for etting survey')
  await mongoConn()
  console.log('Connected, getting survey')
  const encuesta = await Encuesta.find({})
  const res = JSON.parse(JSON.stringify(encuesta))
  mongoose.connection.close()
  console.log('Closed connection, survey getted')
  const datos = await res
  return {
    props: {
      datos
    }
  }
}

export async function getEncId (query) {
  console.log('Connecting for getting survey id')
  await mongoConn()
  console.log('Connected, getting survey id')
  const encuesta = await Encuesta.find({})
  const res = JSON.parse(JSON.stringify(encuesta))
  mongoose.connection.close()
  console.log('Closed connection, survey id getted')
  const datos = await res.find(ele => ele.id === query.id)
  return {
    props: {
      datos
    }
  }
}
