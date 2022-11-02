import { getEncuesta } from 'components/funciones/getAlgo'
import Link from 'next/link'
import React from 'react'
import css from 'styles/all.module.css'

export default function EncuestasL ({ datos }) {
  const data = datos
  return (
    <div className={css.container}>
      <h1>Encuestas</h1>
      {data.map(dat => {
        return (
          <div key={dat.id} className={css.container}>
            <h3>{dat.titulo}</h3>
            <p>{dat.descripcion}</p>
            <Link href={`/app/curso/encuestas/${dat.id}`}>
              <button className={css.but}>Ir a votar</button>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export async function getServerSideProps () {
  return await getEncuesta()
}
