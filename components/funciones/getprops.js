import mongoose from 'mongoose'
import { mongoConn, Tarea } from 'utils/mongo'

export default async function getProps () {
  console.log('Connecting for getting info')
  await mongoConn()
  console.log('Connected, getting info')
  const tarea = await Tarea.find({})
  const res = JSON.parse(JSON.stringify(tarea))
  mongoose.connection.close()
  console.log('Closed connection, info getted!!')
  const datoss = await res
  const datos = datoss.filter(ele => ele.fecha > new Date().getTime())
  return {
    props: {
      datos
    }
  }
}
