import mongoose from 'mongoose'
import { User, mongoConn } from 'utils/mongo'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'

export default async function CreateUser (req, res) {
  const registro = process.env.REGISTRAR
  const secret = process.env.JWT_SECRET
  console.log(registro)
  const resp = req.body
  console.log('Connecting for adding valid user')
  await mongoConn()
  console.log('Connected, you can add valid user')
  if (registro === 'si') {
    try {
      await User.create(resp)
      mongoose.connection.close()
      console.log('Closed connection, new user added')
      const jwebt = jwt.sign(registro, secret)
      const cook = cookie.serialize('admin', jwebt, {
        httpOnly: false,
        sameSite: 'Strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 30 * 12,
        path: '/'
      })
      res.setHeader('Set-Cookie', cook)
      res.status(200).json({ exit: true })
    } catch (err) {
      console.log(err)
      res.json({ problema: 'No se ha podido crear el usuario' })
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
        const jwebt = jwt.sign(usuario, secret)
        const cook = cookie.serialize('admin', jwebt, {
          httpOnly: false,
          sameSite: 'Strict',
          secure: process.env.NODE_ENV === 'production',
          maxAge: 1000 * 60 * 60 * 24 * 30 * 12,
          path: '/'
        })
        res.setHeader('Set-Cookie', cook)
        res.status(200).json({ exit: true })
        console.log('Closed connection, user autenticated')
      }
    } catch (err) {
      console.log(err)
      res.json({ problema: 'No se ha podido iniciar sesión' })
    }
  }
}
