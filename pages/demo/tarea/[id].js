import React from 'react'
import css from 'styles/all.module.css'

export default function IdnDemo ({ datos }) {
  const { fecha, titulo, descripcion, coments } = datos
  return (
    <div className={css.container}>
      <h2>{titulo}</h2>
      <h3>{new Date(fecha).toLocaleDateString()}</h3>
      <p>{descripcion}</p>
      <hr />
      <ul className={css.container}>
        {coments.map(com => {
          return (
            <li key={com.id}>
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
  const ruta = process.env.DATA_URL
  const res = await fetch(`${ruta}/api/fake`)
  const respu = await res.json()
  const datos = respu.find(ele => ele.id === JSON.parse(query.id))
  return {
    props: {
      datos
    }
  }
}
