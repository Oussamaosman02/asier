import getProps from 'components/funciones/getprops'
import { useRef } from 'react'
import handleEvento from 'components/funciones/handle'
import css from 'styles/all.module.css'

export default function Admin ({ datos }) {
  const fecha = useRef()
  const titulo = useRef()
  const desc = useRef()
  const seleccion = useRef()

  async function sendNotificationButtonOnClick (e) {
    e.preventDefault()
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
  }

  return (
    <div className={css.container}>
      <h1>Admin</h1>
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
        onClick={(e) =>
          sendNotificationButtonOnClick(e)}
      >
        Mandar
      </button>
      <hr />
      <h3>Todos los datos</h3>
      {
        datos.map((dat) => handleEvento(dat, 'examen'))
      }
    </div>
  )
}

export async function getServerSideProps () {
  return await getProps()
}
