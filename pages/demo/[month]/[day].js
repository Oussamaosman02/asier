import handleEvento from 'components/funciones/demo/handle'
import Link from 'next/link'
import React from 'react'
import css from 'styles/dia.module.css'
export default function DiaDemo ({ data, datos }) {
  const datoss = datos
  const datas = data
  const year = new Date().getFullYear()
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
      <div className={css.rend}>{datoss.map(dat => handleEvento(dat))}</div>
      <Link href='/demo'>
        <button>Volver</button>
      </Link>
    </div>
  )
}
export async function getServerSideProps ({ query }) {
  const ruta = process.env.DATA_URL
  const res = await fetch(`${ruta}/api/fake`)
  const respu = await res.json()

  const year = new Date().getFullYear()

  const tiempoMas = 86399000
  const fechaActual =
    new Date(year, query.month - 1, query.day).getTime() + tiempoMas
  const datos = respu.filter(fec => fec.fecha === fechaActual)
  const data = query

  return {
    props: {
      data,
      datos
    }
  }
}
