import React, { useRef } from 'react'
import css from 'styles/all.module.css'

export default function Admin () {
  const fecha = useRef()
  const titulo = useRef()
  const desc = useRef()
  const seleccion = useRef()

  const sendNotificationButtonOnClick = async (e, message) => {
    e.preventDefault()

    await fetch('/api/mongo/add-t', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(message)
    })

    await fetch('/api/mongo/notify', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(message)
    })
  }

  return (
    <div className={css.container}>
      <h1>Admin</h1>
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
          onClick={(e) => {
            e.preventDefault()
            const obj = {}
            obj.fecha = fecha.current.valueAsNumber + 82799000
            obj.fechaString = fecha.current.value
            obj.titulo = titulo.current.value
            obj.descripcion = desc.current.value.replace('\n', '.  ')
            obj.tipo = seleccion.current.value
            obj.coments = []
            sendNotificationButtonOnClick(e, obj)
          }}
        >
          Mandar
        </button>
        <br />
      </div>
    </div>
  )
}
