import { mongoConn, Tarea } from 'utils/mongo'
import mongoose from 'mongoose'

export default async function getProps () {
  console.log('Connecting for getting info')
  await mongoConn()
  console.log('Connected, getting info')
  const tarea = await Tarea.find({})
  const res = JSON.parse(JSON.stringify(tarea))
  mongoose.connection.close()
  console.log('Closed connection, info getted!!')
  const datos = await res.filter(ele => ele.fecha > new Date().getTime())
  return {
    props: {
      datos
    }
  }
}
