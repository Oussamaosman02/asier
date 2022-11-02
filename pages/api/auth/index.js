import mongoose from 'mongoose'
import { User, mongoConn } from 'utils/mongo'
const registro = process.env.REGISTRAR
export default async function CreateUser (req, res) {
  console.log(registro)
  const resp = req.body
  console.log('Connecting for adding valid user')
  await mongoConn()
  console.log('Connected, you can add valid user')
  if (registro === 'si') {
    try {
      const user = await User.create(resp)
      mongoose.connection.close()
      res.status(200).json({ exit: true })
      console.log('Closed connection, new user added')
    } catch (err) {
      if ((err.code = 11000)) {
        res.json({ problema: 'Ya existe' })
      } else {
        res.json({ problema: 'No se ha podido crear el usuario' })
      }
    }
  } else {
    try {
      const usuario = resp.user
      const clave = resp.key
      const user = await User.findOne({ user: usuario, key: clave })
      if (!user) {
        res.json({ problema: 'No se ha podido iniciar sesión' })
      } else {
        mongoose.connection.close()
        res.status(200).json({ exit: true })
        console.log('Closed connection, user autenticated')
      }
    } catch (err) {
      res.json({ problema: 'No se ha podido iniciar sesión' })
    }
  }
}
