import { useRef } from 'react'
import { getIdn } from 'components/funciones/getAlgo'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import css from 'styles/comp.module.css'

export default function Idn ({ datos }) {
  const { fecha, fechaString, titulo, descripcion, coments, id } = datos
  const name = Cookies.get('nombre')
  const rut = useRouter()
  const comentario = useRef()
  async function publicar () {
    const texto = comentario.current.value.replace('\n', '.  ')
    const obj = {}
    obj.fecha = fecha
    obj.fechaString = fechaString
    obj.titulo = titulo
    obj.descripcion = descripcion
    obj.coments = coments
    // objeto de los nuevos comentarios
    const nuevo = {}
    nuevo.name = name
    nuevo.body = texto
    if (name && texto) {
      obj.coments.push(nuevo)
      await fetch(`/api/mongo/coment/${id}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
      rut.reload()
    } else {
      console.error('error')
    }
  }
  return (
    <div className={css.tarea}>
      <h2>{titulo}</h2>
      <h3>{fechaString}</h3>
      <p>{descripcion}</p>
      <hr />
      <h4>Añadir comentario</h4>
      <textarea ref={comentario} placeholder='tu comentario va aquí' />
      <button
        className={css.but}
        onClick={e => {
          e.preventDefault()
          publicar()
        }}
      >
        Publicar
      </button>
      <hr />
      <ul className={css.lista}>
        {coments.map(com => {
          return (
            <li className={css.exa} key={com.name + '' + com.body}>
              <h4>{com.name}</h4>
              <p>{com.body}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export async function getServerSideProps ({ query }) {
  return await getIdn(query)
}
