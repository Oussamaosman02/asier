import mongoose from 'mongoose'
import { mongoConn, Tarea } from 'utils/mongo'

export default async function handler (req, res) {
  const { id } = req.query
  const cuerpo = req.body
  console.log('Connecting for adding a coment')
  await mongoConn()
  console.log('Updating coments')
  const nuevo = {
    fecha: cuerpo.fecha,
    fechaString: cuerpo.fechaString,
    titulo: cuerpo.titulo,
    descripcion: cuerpo.descripcion,
    coments: cuerpo.coments
  }
  await Tarea.findByIdAndUpdate(id, nuevo, { new: true }).then(
    resultado => {
      res.json(resultado)
    }
  )
  mongoose.connection.close()
  console.log('Closed connection, coment added')
}
