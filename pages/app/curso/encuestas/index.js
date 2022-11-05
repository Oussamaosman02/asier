import { getEncuesta } from 'components/funciones/getAlgo'
import Link from 'next/link'
import css from 'styles/comp.module.css'

export default function EncuestasL ({ datos }) {
  const data = datos.reverse()
  return (
    <div className={css.enc}>
      <h2>Encuestas</h2>
      {data.map(dat => {
        return (
          <div key={dat.id} className={css.exa}>
            <h4>{dat.titulo}</h4>
            <p>{dat.descripcion}</p>
            <Link href={`/app/curso/encuestas/${dat.id}`}>
              <a>
                <button className={css.but}>Ir a votar</button>
              </a>
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
