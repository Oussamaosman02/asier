import mongoose from 'mongoose'
import { mongoConn, Encuesta } from 'utils/mongo'

export default async function handler (req, res) {
  console.log('Connecting for adding an encuesta')
  await mongoConn()
  console.log('Connected, you can add an encuesta')
  const encuesta = await Encuesta.create(req.body)
  res.json({ encuesta })
  mongoose.connection.close()
  console.log('Closed connection, encuesta added')
}
