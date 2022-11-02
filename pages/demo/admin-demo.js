import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import css from 'styles/all.module.css'

export default function AdminDemo () {
  const [sub, setSub] = useState()
  const fecha = useRef()
  const titulo = useRef()
  const desc = useRef()
  const seleccion = useRef()

  useEffect(() => {
    setSub(JSON.parse(localStorage.getItem('subs')))
  }, [])

  const sendNotificationButtonOnClick = async (e, message) => {
    e.preventDefault()
    const subscription = sub
    if (subscription == null) {
      console.error('web push not subscribed')
      return
    }
    const respuesta = {}
    respuesta.subscription = subscription
    respuesta.message = message
    await fetch('/api/notification', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        respuesta
      })
    })
  }

  return (
    <div className={css.container}>
      <h1>Admin Demo</h1>
      <button
        className={css.but}
        onClick={e => sendNotificationButtonOnClick(e)}
      >
        Notificación de prueba
      </button>
      <br />
      <div className={css.container}>
        <br />
        <input ref={fecha} type='date' />
        <br />
        <input ref={titulo} type='text' placeholder='Título' />
        <br />
        <textarea ref={desc} placeholder='Descripción' />
        <br />
        <select ref={seleccion}>
          <option value='tarea'>Tarea</option>
          <option value='examen'>Examen</option>
          <option value='otro'>Otro</option>
        </select>
        <br />
        <button
          className={css.but}
          onClick={e => {
            e.preventDefault()
            const obj = {}
            obj.fecha = fecha.current.valueAsNumber + 82799000
            obj.fechaString = fecha.current.value
            obj.titulo = titulo.current.value
            obj.descripcion = desc.current.value
            obj.tipo = seleccion.current.value
            sendNotificationButtonOnClick(e, obj)
            const users = JSON.parse(localStorage.getItem('users') || '[]')
            users.push(obj)
            localStorage.setItem('users', JSON.stringify(users))
          }}
        >
          Mandar
        </button>
        <br />
      </div>
      <br />
      <br />
      <Link href='/demo'>
        <button className={css.but}>demo</button>
      </Link>
    </div>
  )
}
