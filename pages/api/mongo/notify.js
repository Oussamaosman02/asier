import mongoose from 'mongoose'
import { Endpoint, mongoConn } from 'utils/mongo'

const webPush = require('web-push')

webPush.setVapidDetails(
  `mailto:${process.env.WEB_PUSH_EMAIL}`,
  process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
  process.env.WEB_PUSH_PRIVATE_KEY
)

export default async function Notify (req, res) {
  console.log('Connecting for sending notification')
  await mongoConn()
  console.log('Connected, you can send notification')
  const endpoint = await Endpoint.find({})
  const respuesta = JSON.parse(JSON.stringify(endpoint))
  mongoose.connection.close()
  console.log('Closed connection, sended notifications')

  if (req.method == 'POST') {
    const mensaje = JSON.stringify(req.body)
    const message = JSON.parse(mensaje)
    const payload = JSON.stringify({
      title: message.titulo,
      message: message.descripcion,
      time: message.fecha
    })
    try {
      respuesta.map(async (subs) => {
        const subscription = {
          endpoint: subs.endpoint,
          keys: subs.keys
        }
        await webPush.sendNotification(subscription, payload)
        console.log('Notificaión enviada')
      })
    } catch (err) {
      if ('statusCode' in err) {
        res.writeHead(err.statusCode, err.headers).end(err.body)
      } else {
        console.error(err)
        res.statusCode = 500
        res.end()
      }
    }
  } else {
    res.statusCode = 405
    res.end()
  }
}
