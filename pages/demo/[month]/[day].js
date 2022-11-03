import handleEvento from 'components/funciones/demo/handle'
import Link from 'next/link'
import css from 'styles/all.module.css'
export default function DiaDemo ({ data, datos }) {
  const datoss = datos
  const datas = data
  const year = new Date().getFullYear()
  const monthName = new Intl.DateTimeFormat('es', { month: 'long' }).format(
    new Date(year, datas.month - 1)
  )
  return (
    <div className={css.container}>
      <h2>
        {datas.day} de {monthName} del {datas.month > 12 ? year + 1 : year}
      </h2>
      <br />
      <h3>Eventos</h3>
      <div className={css.rend}>{datoss.map(dat => handleEvento(dat))}</div>
      <Link href='/demo'>
        <a>
          <button className={css.but}>Volver</button>
        </a>
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
