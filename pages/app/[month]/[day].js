import { getDay } from 'components/funciones/getAlgo'
import handleEvento from 'components/funciones/handle'
import Link from 'next/link'
import css from 'styles/comp.module.css'

export default function Dia ({ data, datos }) {
  const datoss = datos
  const datas = data

  const year = new Date().getFullYear()
  const monthName = new Intl.DateTimeFormat('es', { month: 'long' }).format(
    new Date(year, datas.month - 1)
  )
  return (
    <div className={css.monthday}>
      <h2>
        {datas.day} de {monthName} del {datas.month > 12 ? year + 1 : year}
      </h2>
      <hr />
      <h3>Eventos</h3>
      <div>{datoss.map(dat => handleEvento(dat))}</div>
      <Link href='/app'>
        <a>
          <button className={css.but}>Volver</button>
        </a>
      </Link>
    </div>
  )
}
// recuperamos los datos desde el server
export async function getServerSideProps ({ query }) {
  return await getDay(query)
}
