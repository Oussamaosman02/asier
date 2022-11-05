import { useRef } from 'react'
import css from 'styles/all.module.css'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import Link from 'next/link'
export default function Admin () {
  const fecha = useRef()
  const titulo = useRef()
  const desc = useRef()
  const seleccion = useRef()
  const rut = useRouter()
  const admin = Cookies.get('admin')

  async function sendNotificationButtonOnClick () {
    const obj = {}
    obj.fecha = fecha.current.valueAsNumber + 82799000
    obj.fechaString = fecha.current.value
    obj.titulo = titulo.current.value
    obj.descripcion = desc.current.value.replace('\n', '.  ')
    obj.tipo = seleccion.current.value
    obj.coments = []

    await fetch('/api/mongo/add-t', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(obj)
    })

    await fetch('/api/mongo/notify', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
    rut.reload()
  }
  if (admin !== undefined) {
    return (
      <div className={css.container}>
        <h2>Admin</h2>
        <br />
        <input ref={fecha} type='date' />
        <br />
        <input ref={titulo} type='text' placeholder='Título' />
        <br />
        <textarea ref={desc} placeholder='Descripción' />
        <br />
        <select name='selección' defaultValue='otro' ref={seleccion}>
          <option value='examen'>Examen</option>
          <option value='otro'>Otro</option>
          <option value='tarea'>Tarea</option>
        </select>
        <br />
        <button
          className={css.but}
          onClick={(e) => {
            e.preventDefault()
            sendNotificationButtonOnClick()
          }}
        >
          Mandar
        </button>
      </div>
    )
  } else {
    return (
      <div>
        <h4 className={css.container}>
          No debes estar aquí!!
        </h4>
        <Link href='/'>
          <button className={css.but}>
            Ir a casa
          </button>
        </Link>
      </div>
    )
  }
}
