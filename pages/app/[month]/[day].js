import { getDay } from 'components/funciones/getAlgo'
import handleEvento from 'components/funciones/handle'
import Link from 'next/link'
import React from 'react'
import css from 'styles/dia.module.css'

export default function Dia ({ data, datos }) {
  const year = new Date().getFullYear()

  const datoss = datos
  const datas = data

  const monthName = new Intl.DateTimeFormat('es', { month: 'long' }).format(
    new Date(year, datas.month - 1)
  )

  return (
    <div className={css.container}>
      <h1>
        {datas.day} de {monthName} del {datas.month > 12 ? year + 1 : year}
      </h1>
      <br />
      <h2>Eventos</h2>
      <div className={css.rend}>{datoss.map((dat) => handleEvento(dat))}</div>
      <Link href='/demo'>
        <button>Volver</button>
      </Link>
    </div>
  )
}
// recuperamos los datos desde el server
export async function getServerSideProps ({ query }) {
  return await getDay(query)
}
